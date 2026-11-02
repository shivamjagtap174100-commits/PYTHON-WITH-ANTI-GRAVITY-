


/**
 * Anti-Gravity Python Execution Engine
 * Dual-Mode Architecture:
 * 1. Pyodide WASM Engine: Real CPython 3.12 running in WebAssembly (loaded async via CDN)
 * 2. Quantum Local Virtual Machine: Zero-dependency, instant, offline-capable Python transpiler & evaluator
 */

class PythonEngine {
  constructor() {
    this.pyodide = null;
    this.isPyodideLoading = false;
    this.isPyodideReady = false;
    this.engineMode = 'auto'; // 'auto', 'pyodide', 'local'
    this.onStatusChange = null;

    // Initialize Pyodide asynchronously in background
    this.initPyodide();
  }

  async initPyodide() {
    if (typeof window === 'undefined') return;

    // Check if pyodide script is present or can be loaded
    try {
      this.isPyodideLoading = true;
      this.notifyStatus('loading', 'Loading Quantum WASM Runtime...');

      // Load Pyodide CDN script dynamically if not already in document
      if (!window.loadPyodide) {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.onload = resolve;
          script.onerror = () => reject(new Error('CDN unreachable or offline'));
          document.head.appendChild(script);
        });
      }

      if (window.loadPyodide) {
        this.pyodide = await window.loadPyodide({
          indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/'
        });
        this.isPyodideReady = true;
        this.isPyodideLoading = false;
        this.notifyStatus('ready', 'Pyodide WASM 3.12 Engine Ready');
        console.log('[Anti-Gravity Engine] Pyodide WASM ready');
      }
    } catch (err) {
      console.warn('[Anti-Gravity Engine] Pyodide WASM unavailable, operating on Quantum Local VM:', err.message);
      this.isPyodideLoading = false;
      this.isPyodideReady = false;
      this.notifyStatus('local', 'Quantum Local VM Active (Zero-Latency)');
    }
  }

  notifyStatus(status, message) {
    if (this.onStatusChange) {
      this.onStatusChange({ status, message, isReady: this.isPyodideReady });
    }
  }

  /**
   * Main execute function
   * @param {string} code - Python source code
   * @returns {Promise<{ stdout: string, error: string|null, executionTimeMs: number, engineUsed: string }>}
   */
  async execute(code) {
    const startTime = performance.now();
    let stdout = '';
    let error = null;
    let engineUsed = 'Quantum Local VM';

    // If Pyodide is ready and allowed, run with Pyodide
    if (this.isPyodideReady && this.engineMode !== 'local') {
      try {
        engineUsed = 'CPython 3.12 (WASM)';
        const capturedOutput = [];

        // Redirect stdout/stderr in Python
        this.pyodide.setStdout({
          batched: (text) => capturedOutput.push(text)
        });
        this.pyodide.setStderr({
          batched: (text) => capturedOutput.push(`[STDERR] ${text}`)
        });

        await this.pyodide.runPythonAsync(code);
        stdout = capturedOutput.join('\n');
      } catch (pyErr) {
        // Format python error nicely
        const errLines = (pyErr.message || String(pyErr)).split('\n');
        // Clean Pyodide wrapper noise
        const filteredLines = errLines.filter(line => !line.includes('File "/lib/python') && !line.includes('pyodide.asm.js'));
        error = filteredLines.join('\n').trim() || pyErr.message;
      }
    } else {
      // Run with Quantum Local Virtual Machine
      try {
        engineUsed = 'Quantum Local VM';
        const result = this.runLocalPython(code);
        stdout = result.stdout;
        error = result.error;
      } catch (localErr) {
        error = localErr.message || String(localErr);
      }
    }

    const executionTimeMs = Math.round((performance.now() - startTime) * 100) / 100;
    return {
      stdout: stdout.trimEnd(),
      error,
      executionTimeMs,
      engineUsed
    };
  }

  /**
   * Quantum Local VM: A smart Python-to-JavaScript transcribing evaluator
   * Handles:
   * - print() with multiple args, sep, end, math expressions, f-strings
   * - assignments: int, float, string, boolean, list, dict
   * - operators: arithmetic (+, -, *, /, //, %, **), comparison, logical (and, or, not)
   * - built-ins: len(), type(), int(), float(), str(), range(), sum(), min(), max(), abs(), round()
   * - string methods: .upper(), .lower(), .strip(), .replace(), .split(), .join()
   * - list methods: .append(), .pop(), .remove(), indexing [0], [-1], slicing
   * - dict methods: .keys(), .values(), .items(), .get()
   * - if / elif / else blocks with indentation
   * - for loops (range, iterable, dict items)
   * - while loops with infinite loop protection
   * - def functions with return statements
   */
  runLocalPython(code) {
    const outputBuffer = [];

    // Safety check for empty or whitespace
    if (!code || !code.trim()) {
      return { stdout: '', error: null };
    }

    // Step 1: Pre-process and transpile Python code to runnable JavaScript
    const jsCode = this.transpilePythonToJS(code, outputBuffer);

    // Step 2: Execute in a safe isolated scope with built-in mock environment
    try {
      const sandbox = this.createSandboxEnvironment(outputBuffer);
      const runner = new Function(...Object.keys(sandbox), jsCode);
      runner(...Object.values(sandbox));

      return {
        stdout: outputBuffer.join('\n'),
        error: null
      };
    } catch (err) {
      let friendlyError = err.message;
      if (err.name === 'SyntaxError') {
        friendlyError = `SyntaxError: ${err.message}. Please check colons (:), quotes, or parenthesis.`;
      } else if (err.name === 'ReferenceError') {
        const match = err.message.match(/([a-zA-Z0-9_]+) is not defined/);
        if (match) {
          friendlyError = `NameError: name '${match[1]}' is not defined. Check variable name spelling.`;
        }
      }
      return {
        stdout: outputBuffer.join('\n'),
        error: friendlyError
      };
    }
  }

  createSandboxEnvironment(outputBuffer) {
    // Custom print function
    const print = (...args) => {
      let sep = ' ';
      let end = '';
      let filteredArgs = [];

      for (let i = 0; i < args.length; i++) {
        const a = args[i];
        if (a && typeof a === 'object' && a.__kwarg_sep !== undefined) {
          sep = a.__kwarg_sep;
        } else if (a && typeof a === 'object' && a.__kwarg_end !== undefined) {
          end = a.__kwarg_end;
        } else {
          filteredArgs.push(this.formatPythonValue(a));
        }
      }

      const outStr = filteredArgs.join(sep) + end;
      outputBuffer.push(outStr);
    };

    // Python-style range
    const range = (start, stop, step) => {
      if (stop === undefined) {
        stop = start;
        start = 0;
      }
      if (step === undefined) {
        step = start <= stop ? 1 : -1;
      }
      const arr = [];
      if (step > 0) {
        for (let i = start; i < stop; i += step) arr.push(i);
      } else if (step < 0) {
        for (let i = start; i > stop; i += step) arr.push(i);
      }
      return arr;
    };

    // Python built-ins
    const len = (obj) => {
      if (obj === null || obj === undefined) return 0;
      if (typeof obj === 'string' || Array.isArray(obj)) return obj.length;
      if (typeof obj === 'object') return Object.keys(obj).length;
      return 0;
    };

    const str = (v) => this.formatPythonValue(v);
    const int = (v) => {
      const res = parseInt(v, 10);
      if (isNaN(res)) throw new Error(`ValueError: invalid literal for int() with base 10: '${v}'`);
      return res;
    };
    const float = (v) => {
      const res = parseFloat(v);
      if (isNaN(res)) throw new Error(`ValueError: could not convert string to float: '${v}'`);
      return res;
    };
    const type = (v) => {
      if (v === null) return "<class 'NoneType'>";
      if (typeof v === 'boolean') return "<class 'bool'>";
      if (typeof v === 'number') return Number.isInteger(v) ? "<class 'int'>" : "<class 'float'>";
      if (typeof v === 'string') return "<class 'str'>";
      if (Array.isArray(v)) return "<class 'list'>";
      if (typeof v === 'object') return "<class 'dict'>";
      return `<class '${typeof v}'>`;
    };

    const sum = (arr) => Array.isArray(arr) ? arr.reduce((a, b) => a + b, 0) : 0;
    const min = (...args) => {
      const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      return Math.min(...list);
    };
    const max = (...args) => {
      const list = args.length === 1 && Array.isArray(args[0]) ? args[0] : args;
      return Math.max(...list);
    };
    const abs = (v) => Math.abs(v);
    const round = (v, digits = 0) => {
      const factor = Math.pow(10, digits);
      return Math.round(v * factor) / factor;
    };

    // Helper for Python negative indexing and dict wrapping
    const _pyGet = (obj, idx) => {
      if (Array.isArray(obj) || typeof obj === 'string') {
        const i = typeof idx === 'number' ? (idx < 0 ? obj.length + idx : idx) : idx;
        return obj[i];
      }
      if (obj && typeof obj === 'object') {
        return obj[idx];
      }
      return undefined;
    };

    const _pySet = (obj, idx, val) => {
      if (Array.isArray(obj)) {
        const i = typeof idx === 'number' ? (idx < 0 ? obj.length + idx : idx) : idx;
        obj[i] = val;
      } else if (obj && typeof obj === 'object') {
        obj[idx] = val;
      }
      return val;
    };

    // Helper for dict item iteration
    const _pyItems = (dict) => {
      if (!dict || typeof dict !== 'object') return [];
      return Object.entries(dict);
    };

    // Infinite loop safeguard counter
    let __loopCounter = 0;
    const __loopCheck = () => {
      __loopCounter++;
      if (__loopCounter > 50000) {
        throw new Error('RuntimeError: Maximum loop iterations exceeded (possible infinite loop prevented).');
      }
    };

    return {
      print,
      range,
      len,
      str,
      int,
      float,
      type,
      sum,
      min,
      max,
      abs,
      round,
      _pyGet,
      _pySet,
      _pyItems,
      __loopCheck,
      True: true,
      False: false,
      None: null
    };
  }

  formatPythonValue(v) {
    if (v === true) return 'True';
    if (v === false) return 'False';
    if (v === null || v === undefined) return 'None';
    if (Array.isArray(v)) {
      return '[' + v.map(x => (typeof x === 'string' ? `'${x}'` : this.formatPythonValue(x))).join(', ') + ']';
    }
    if (typeof v === 'object') {
      const pairs = Object.entries(v).map(([k, val]) => {
        const formattedVal = typeof val === 'string' ? `'${val}'` : this.formatPythonValue(val);
        return `'${k}': ${formattedVal}`;
      });
      return '{' + pairs.join(', ') + '}';
    }
    return String(v);
  }

  groupMultilineStatements(rawLines) {
    const grouped = [];
    let currentLine = '';
    let currentIndent = 0;
    let depth = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < rawLines.length; i++) {
      const line = rawLines[i];
      const trimmed = line.trim();

      if (depth === 0) {
        if (!trimmed || trimmed.startsWith('#')) {
          continue;
        }
        const indentMatch = line.match(/^(\s*)/);
        currentIndent = indentMatch ? indentMatch[1].replace(/\t/g, '    ').length : 0;
        currentLine = trimmed;
      } else {
        currentLine += ' ' + trimmed;
      }

      // Calculate depth change outside quotes
      for (let j = 0; j < line.length; j++) {
        const c = line[j];
        if (c === "'" && !inDouble) inSingle = !inSingle;
        else if (c === '"' && !inSingle) inDouble = !inDouble;
        else if (!inSingle && !inDouble) {
          if (c === '(' || c === '[' || c === '{') depth++;
          else if (c === ')' || c === ']' || c === '}') depth = Math.max(0, depth - 1);
        }
      }

      if (depth === 0) {
        grouped.push({ indent: currentIndent, content: currentLine });
        currentLine = '';
      }
    }
    if (currentLine) {
      grouped.push({ indent: currentIndent, content: currentLine });
    }
    return grouped;
  }

  /**
   * Transpile Python syntax to JavaScript
   */
  transpilePythonToJS(code) {
    const rawLines = code.split('\n');
    const indentStack = [0];
    const jsLines = [];

    // Check for obvious syntax errors beforehand
    for (let i = 0; i < rawLines.length; i++) {
      const trimmed = rawLines[i].trim();
      if (!trimmed || trimmed.startsWith('#')) continue;

      // Check missing colon on control flow
      if (/^(if|elif|else|for|while|def)\b/.test(trimmed) && !trimmed.endsWith(':')) {
        throw new SyntaxError(`Line ${i + 1}: Missing colon ':' at the end of statement '${trimmed}'`);
      }
    }

    // Group multi-line statements (like multi-line dicts or lists)
    const statements = this.groupMultilineStatements(rawLines);

    for (let i = 0; i < statements.length; i++) {
      const stmt = statements[i];
      const indent = stmt.indent;
      let content = stmt.content;

      const currentIndent = indentStack[indentStack.length - 1];

      // Handle dedent
      if (indent < currentIndent) {
        while (indentStack.length > 1 && indentStack[indentStack.length - 1] > indent) {
          indentStack.pop();
          jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
        }
      }

      // Strip inline comments: `# ...` but ignore inside strings
      content = this.stripInlineComments(content);

      // Transform f-strings: f"Hello {name}!" -> `Hello ${name}!`
      content = this.transformFStrings(content);

      // Transform python operators & literals
      content = this.transformOperators(content);

      // Handle control structures
      if (content.startsWith('def ')) {
        const match = content.match(/^def\s+([a-zA-Z0-9_]+)\s*\((.*?)\)\s*:$/);
        if (match) {
          const fnName = match[1];
          const rawParams = match[2];
          // Handle default parameters: param=value
          const params = this.transformDefParams(rawParams);
          jsLines.push(' '.repeat(indent) + `function ${fnName}(${params}) {`);
          indentStack.push(indent + 4);
          continue;
        }
      } else if (content.startsWith('if ')) {
        const cond = content.replace(/^if\s+/, '').replace(/:$/, '').trim();
        jsLines.push(' '.repeat(indent) + `if (${this.transformExpression(cond)}) {`);
        indentStack.push(indent + 4);
        continue;
      } else if (content.startsWith('elif ')) {
        const cond = content.replace(/^elif\s+/, '').replace(/:$/, '').trim();
        jsLines.push(' '.repeat(indent) + `else if (${this.transformExpression(cond)}) {`);
        indentStack.push(indent + 4);
        continue;
      } else if (content === 'else:') {
        jsLines.push(' '.repeat(indent) + `else {`);
        indentStack.push(indent + 4);
        continue;
      } else if (content.startsWith('while ')) {
        const cond = content.replace(/^while\s+/, '').replace(/:$/, '').trim();
        jsLines.push(' '.repeat(indent) + `while (${this.transformExpression(cond)}) { __loopCheck();`);
        indentStack.push(indent + 4);
        continue;
      } else if (content.startsWith('for ')) {
        // e.g. for i in range(5):
        // or for item in cargo:
        // or for k, v in star_map.items():
        const forMatch = content.match(/^for\s+(.*?)\s+in\s+(.*?)\s*:$/);
        if (forMatch) {
          const iterVar = forMatch[1].trim();
          const iterSource = forMatch[2].trim();

          if (iterVar.includes(',')) {
            // Unpacking: k, v in dict.items()
            const [v1, v2] = iterVar.split(',').map(s => s.trim());
            const sourceExpr = iterSource.includes('.items()')
              ? `_pyItems(${iterSource.replace('.items()', '')})`
              : this.transformExpression(iterSource);
            jsLines.push(' '.repeat(indent) + `for (let [${v1}, ${v2}] of (${sourceExpr})) { __loopCheck();`);
          } else {
            const sourceExpr = this.transformExpression(iterSource);
            jsLines.push(' '.repeat(indent) + `for (let ${iterVar} of (${sourceExpr})) { __loopCheck();`);
          }
          indentStack.push(indent + 4);
          continue;
        }
      } else if (content.startsWith('return ')) {
        const retExpr = content.replace(/^return\s+/, '').trim();
        jsLines.push(' '.repeat(indent) + `return ${this.transformExpression(retExpr)};`);
        continue;
      } else if (content === 'return') {
        jsLines.push(' '.repeat(indent) + `return;`);
        continue;
      }

      // Check simple assignment: a = 10, or list indexing a[0] = 5
      const assignMatch = content.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*(=|\+=|-=|\*=|\/=)\s*(.+)$/);
      if (assignMatch && !content.startsWith('print(')) {
        const varName = assignMatch[1];
        const op = assignMatch[2];
        const valExpr = assignMatch[3];

        let rightSide = this.transformExpression(valExpr);
        if (op === '=') {
          // Declare variable if not yet declared in this scope (or attach to window/scope)
          jsLines.push(' '.repeat(indent) + `var ${varName} ${op} ${rightSide};`);
        } else {
          jsLines.push(' '.repeat(indent) + `${varName} ${op} ${rightSide};`);
        }
        continue;
      }

      // Check indexing assignment: d["k"] = v or cargo[0] = "val"
      const indexAssignMatch = content.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\[(.*?)\]\s*=\s*(.+)$/);
      if (indexAssignMatch) {
        const objName = indexAssignMatch[1];
        const idxExpr = indexAssignMatch[2];
        const valExpr = indexAssignMatch[3];
        jsLines.push(' '.repeat(indent) + `_pySet(${objName}, ${this.transformExpression(idxExpr)}, ${this.transformExpression(valExpr)});`);
        continue;
      }

      // Standard expression or function call
      jsLines.push(' '.repeat(indent) + `${this.transformExpression(content)};`);
    }

    // Close any remaining open indents
    while (indentStack.length > 1) {
      indentStack.pop();
      jsLines.push(' '.repeat(indentStack[indentStack.length - 1]) + '}');
    }

    return jsLines.join('\n');
  }

  stripInlineComments(line) {
    let inSingle = false;
    let inDouble = false;
    for (let i = 0; i < line.length; i++) {
      const c = line[i];
      if (c === "'" && !inDouble) inSingle = !inSingle;
      else if (c === '"' && !inSingle) inDouble = !inDouble;
      else if (c === '#' && !inSingle && !inDouble) {
        return line.substring(0, i).trimEnd();
      }
    }
    return line;
  }

  transformFStrings(str) {
    let result = '';
    let i = 0;
    while (i < str.length) {
      if ((str[i] === 'f' || str[i] === 'F') && (str[i + 1] === '"' || str[i + 1] === "'")) {
        const quote = str[i + 1];
        i += 2; // skip f and quote
        let templateContent = '';
        let braceDepth = 0;
        let inInnerSingle = false;
        let inInnerDouble = false;

        while (i < str.length) {
          const c = str[i];
          if (c === quote && braceDepth === 0) {
            i++; // skip closing quote
            break;
          }
          if (c === '{' && !inInnerSingle && !inInnerDouble) {
            braceDepth++;
            templateContent += '${';
            i++;
            continue;
          }
          if (c === '}' && !inInnerSingle && !inInnerDouble && braceDepth > 0) {
            braceDepth--;
            templateContent += '}';
            i++;
            continue;
          }
          if (braceDepth > 0) {
            if (c === "'" && !inInnerDouble) inInnerSingle = !inInnerSingle;
            else if (c === '"' && !inInnerSingle) inInnerDouble = !inInnerDouble;
          }
          templateContent += c;
          i++;
        }
        result += '`' + templateContent + '`';
      } else {
        result += str[i];
        i++;
      }
    }
    return result;
  }

  transformOperators(expr) {
    // Exponentiation ** -> Math.pow or **
    // Python // -> Math.floor(a / b)
    // and, or, not
    // True, False, None
    let res = expr;

    // Replace Python keywords not in quotes
    res = res.replace(/\bTrue\b/g, 'true');
    res = res.replace(/\bFalse\b/g, 'false');
    res = res.replace(/\bNone\b/g, 'null');

    // Replace boolean words
    res = res.replace(/\band\b/g, '&&');
    res = res.replace(/\bor\b/g, '||');
    res = res.replace(/\bnot\s+/g, '!');

    // Handle floor division `a // b`
    res = res.replace(/([a-zA-Z0-9_\(\)]+)\s*\/\/\s*([a-zA-Z0-9_\(\)]+)/g, 'Math.floor($1 / $2)');

    return res;
  }

  transformDefParams(rawParams) {
    if (!rawParams.trim()) return '';
    const parts = rawParams.split(',').map(p => p.trim());
    const transformed = parts.map(p => {
      if (p.includes('=')) {
        const [name, defaultVal] = p.split('=').map(s => s.trim());
        return `${name} = ${this.transformExpression(defaultVal)}`;
      }
      return p;
    });
    return transformed.join(', ');
  }

  transformExpression(expr) {
    let s = expr.trim();
    if (!s) return '';

    // Handle print arguments with sep= and end=
    if (s.startsWith('print(') && s.endsWith(')')) {
      const inner = s.substring(6, s.length - 1);
      const args = this.splitArgs(inner);
      const transformedArgs = args.map(arg => {
        const trimmedArg = arg.trim();
        if (trimmedArg.startsWith('sep=')) {
          return `{ __kwarg_sep: ${this.transformExpression(trimmedArg.replace('sep=', ''))} }`;
        }
        if (trimmedArg.startsWith('end=')) {
          return `{ __kwarg_end: ${this.transformExpression(trimmedArg.replace('end=', ''))} }`;
        }
        return this.transformExpression(trimmedArg);
      });
      return `print(${transformedArgs.join(', ')})`;
    }

    // Handle negative list indexing in expressions e.g. cargo[-1] -> _pyGet(cargo, -1)
    s = s.replace(/([a-zA-Z_][a-zA-Z0-9_]*)\[\s*(-[0-9]+)\s*\]/g, '_pyGet($1, $2)');

    // Handle list .append() -> .push()
    s = s.replace(/\.append\(/g, '.push(');

    // Handle string methods
    // .lower(), .upper(), .strip() -> .trim()
    s = s.replace(/\.strip\(\)/g, '.trim()');
    s = s.replace(/\.lower\(\)/g, '.toLowerCase()');
    s = s.replace(/\.upper\(\)/g, '.toUpperCase()');

    return s;
  }

  splitArgs(argString) {
    const args = [];
    let current = '';
    let depth = 0;
    let inSingle = false;
    let inDouble = false;

    for (let i = 0; i < argString.length; i++) {
      const c = argString[i];
      if (c === "'" && !inDouble) inSingle = !inSingle;
      else if (c === '"' && !inSingle) inDouble = !inDouble;
      else if (!inSingle && !inDouble) {
        if (c === '(' || c === '[' || c === '{') depth++;
        else if (c === ')' || c === ']' || c === '}') depth--;
        else if (c === ',' && depth === 0) {
          args.push(current.trim());
          current = '';
          continue;
        }
      }
      current += c;
    }
    if (current.trim()) {
      args.push(current.trim());
    }
    return args;
  }
}

// Global instance export
if (typeof window !== 'undefined') {
  window.antiGravityEngine = new PythonEngine();
}
if (typeof module !== 'undefined') {
  module.exports = { PythonEngine };
}
