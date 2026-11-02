/**
 * Anti-Gravity Python - Official Beginner Curriculum
 * Aligned with the CCBP & University Python Foundation Syllabus:
 * 1. Introduction to Python & Sequence of Instructions
 * 2. Type Conversions & Arithmetic Operators
 * 3. Conditional Statements (Decision Making)
 * 4. Loops & Loop Control Statements
 * 5. Data Structures & Nested Data Types
 */

const CURRICULUM = [
  {
    id: 'mod-1',
    number: 1,
    title: 'Introduction to Python & Sequence of Instructions',
    subtitle: 'The Launchpad: Syntax, Print, and Variables',
    icon: 'terminal',
    badge: 'Python Initiate',
    description: 'Learn how to write your very first Python program, print text to the console, use comments, and store data in variables.',
    xpTotal: 250,
    lessons: [
      {
        id: 'm1-l1',
        moduleId: 'mod-1',
        title: 'Your First Program & The print() Function',
        subtitle: 'Printing text, string literals, and comments',
        difficulty: 'Beginner',
        xp: 100,
        story: 'Welcome to Python! Python is one of the most readable, powerful, and beginner-friendly programming languages in the world. Let us start your coding journey by writing instructions to display messages on the console.',
        theory: {
          overview: `In Python, your instructions run sequentially from top to bottom. The simplest and most important tool to display output to the screen is the built-in \`print()\` function.
          
Whatever you pass inside the parentheses \`(...)\` will be printed to your terminal.`,
          sections: [
            {
              title: '1. The print() Statement',
              content: `To print text (called a **string** in programming), enclose your words inside single quotes \`'...\'\` or double quotes \`"..."\`:`,
              code: `print("Hello, World!")
print('Welcome to Python!')`
            },
            {
              title: '2. Adding Helpful Comments (#)',
              content: `A **comment** is a note written for human readers. Python completely ignores comments when running your program. Create a comment by putting a hash symbol \`#\` at the start of a line:`,
              code: `# This is a comment - Python will not execute this line
print("Python is fun!")  # You can also add comments at the end of a line`
            },
            {
              title: '3. Printing Multiple Items',
              content: `You can print multiple items in a single \`print()\` call by separating them with commas. Python automatically adds a space between each item:`,
              code: `print("Hello", "from", "Anti-Gravity", "Python!")`
            }
          ],
          cosmicTip: 'Python is strictly case-sensitive! You must type \`print()\` in all lowercase. Typing \`Print()\` with a capital P will trigger an error.',
          syntaxTokens: [
            { token: 'print(...)', description: 'Built-in function to display text and values in the console' },
            { token: '"..." or \'...\'', description: 'String literals representing textual data' },
            { token: '#', description: 'Comment indicator; everything after # on the line is ignored' }
          ]
        },
        practice: {
          objective: 'Write your first Python program to print greetings on two separate lines.',
          checklist: [
            'Add a comment describing your program using #',
            'Use print() to output: Hello, World!',
            'Use a second print() to output: Welcome to Python!'
          ],
          expectedOutput: "Hello, World!\nWelcome to Python!",
          starterCode: `# Lesson 1.1: Your First Python Program
# 1. Print "Hello, World!" on the first line
# 2. Print "Welcome to Python!" on the second line

`,
          solutionCode: `# My first Python script
print("Hello, World!")
print("Welcome to Python!")`,
          hints: [
            {
              level: 1,
              title: 'Print Function Basics',
              text: 'Use `print("Hello, World!")` on the first line, then press Enter and add another `print(...)`.'
            },
            {
              level: 2,
              title: 'Quotation Marks',
              text: 'Make sure your text is wrapped in quotes: `print("Welcome to Python!")`.'
            },
            {
              level: 3,
              title: 'Full Template',
              text: 'Write:\nprint("Hello, World!")\nprint("Welcome to Python!")'
            }
          ],
          validator: (output, code) => {
            const hasPrint = /print\s*\(/i.test(code);
            const hasComment = /#/.test(code);
            const hasHello = output.includes('Hello, World!');
            const hasWelcome = output.includes('Welcome to Python!');

            if (!hasPrint) {
              return { success: false, message: 'You must invoke the print() function.' };
            }
            if (!hasHello) {
              return { success: false, message: 'Expected output to include "Hello, World!". Check spelling and capitalization.' };
            }
            if (!hasWelcome) {
              return { success: false, message: 'Expected output to include "Welcome to Python!". Check your second print line.' };
            }
            return { success: true, message: 'Excellent! Your first Python program executed successfully.' };
          }
        }
      },
      {
        id: 'm1-l2',
        moduleId: 'mod-1',
        title: 'Variables & Sequence of Instructions',
        subtitle: 'Storing data, naming rules, and sequential flow',
        difficulty: 'Beginner',
        xp: 150,
        story: 'Programs need memory to remember numbers, names, and user data. A variable is like a labelled storage box that holds information so you can use it later in your program.',
        theory: {
          overview: `In Python, you create a variable by giving it a name and assigning it a value using the equals sign \`=\`.
          
Python executes code **sequentially**: line 1 executes first, then line 2, then line 3. If you change a variable later in the file, it takes on the new value from that point forward.`,
          sections: [
            {
              title: '1. Creating and Using Variables',
              content: `To assign a value to a variable, write the variable name, an \`=\` operator, and the value:`,
              code: `student_name = "Alex"
age = 15

print(student_name)
print(age)`
            },
            {
              title: '2. Variable Naming Rules',
              content: `Rules for naming variables in Python:
- Must begin with a letter or underscore \`_\` (cannot start with a number).
- Can contain letters, numbers, and underscores (e.g., \`user_1\`, \`total_score\`).
- Cannot contain spaces (use underscores like \`student_age\` instead).
- Use lowercase words separated by underscores (**snake_case**).`,
              code: `first_name = "Maya"   # Correct
total_score = 98     # Correct
# 1st_name = "Maya"  # INVALID: cannot start with a number`
            },
            {
              title: '3. Modern f-Strings (Combining Text and Variables)',
              content: `To combine text with variables easily, put the letter \`f\` right before the quotes, and wrap the variable name inside curly braces \`{...}\`:`,
              code: `name = "Alex"
age = 15
print(f"Student {name} is {age} years old.")
# Output: Student Alex is 15 years old.`
            }
          ],
          cosmicTip: 'Do not put quotation marks around variable names! \`print(name)\` prints the value stored in the variable, while \`print("name")\` prints the literal word "name".',
          syntaxTokens: [
            { token: 'variable = value', description: 'Assigns value on the right into the variable on the left' },
            { token: 'snake_case', description: 'Naming style with lowercase words separated by underscores' },
            { token: 'f"Text {var}"', description: 'f-string to dynamically insert variables into text' }
          ]
        },
        practice: {
          objective: 'Declare student variables and print a formatted summary sentence.',
          checklist: [
            'Create variable student_name and set it to "Alex"',
            'Create variable age and set it to 15',
            'Print the formatted text: "Student Alex is 15 years old."'
          ],
          expectedOutput: 'Student Alex is 15 years old.',
          starterCode: `# Declare your variables below:
student_name = 
age = 

# Print the sentence: "Student Alex is 15 years old."
`,
          solutionCode: `student_name = "Alex"
age = 15
print(f"Student {student_name} is {age} years old.")`,
          hints: [
            {
              level: 1,
              title: 'Variable Declarations',
              text: 'Set `student_name = "Alex"` and `age = 15`.'
            },
            {
              level: 2,
              title: 'Formatted String',
              text: 'Use an f-string: `print(f"Student {student_name} is {age} years old.")`.'
            },
            {
              level: 3,
              title: 'Full Template',
              text: 'student_name = "Alex"\nage = 15\nprint(f"Student {student_name} is {age} years old.")'
            }
          ],
          validator: (output, code) => {
            const hasNameVar = /student_name\s*=\s*['"]Alex['"]/i.test(code);
            const hasAgeVar = /age\s*=\s*15/.test(code);
            const matchesText = output.includes('Student Alex is 15 years old');

            if (!hasNameVar) {
              return { success: false, message: 'Make sure student_name is set to "Alex".' };
            }
            if (!hasAgeVar) {
              return { success: false, message: 'Make sure age is set to 15.' };
            }
            if (!matchesText) {
              return { success: false, message: `Expected "Student Alex is 15 years old.", but got "${output}".` };
            }
            return { success: true, message: 'Variables and sequential instructions mastered!' };
          }
        }
      }
    ]
  },
  {
    id: 'mod-2',
    number: 2,
    title: 'Type Conversions & Arithmetic Operators',
    subtitle: 'Core Math, Floor Division, Modulo, and Casting',
    icon: 'calculator',
    badge: 'Calculation Wizard',
    description: 'Master addition, subtraction, multiplication, division, modulo (%), powers (**), and converting data types.',
    xpTotal: 350,
    lessons: [
      {
        id: 'm2-l1',
        moduleId: 'mod-2',
        title: 'Basic Arithmetic Operators (+, -, *, /)',
        subtitle: 'Addition, subtraction, multiplication, and float division',
        difficulty: 'Beginner',
        xp: 100,
        story: 'Computers are fundamentally calculation machines. Python can calculate store totals, distances, averages, and scientific equations with blistering speed.',
        theory: {
          overview: `Python provides all standard mathematical operations right out of the box:
- **Addition (\`+\`)**: Adds numbers together
- **Subtraction (\`-\`)**: Subtracts right number from left
- **Multiplication (\`*\`)**: Multiplies numbers
- **Division (\`/\`)**: Divides and always produces a floating-point number (e.g. \`10 / 2\` becomes \`5.0\`).`,
          sections: [
            {
              title: '1. Standard Arithmetic in Action',
              content: `You can perform calculations directly in print statements or store the results in variables:`,
              code: `a = 20
b = 5

print(a + b)  # 25 (Addition)
print(a - b)  # 15 (Subtraction)
print(a * b)  # 100 (Multiplication)
print(a / b)  # 4.0 (Division - always a float)`
            },
            {
              title: '2. Calculating Totals in Everyday Life',
              content: `A common programming pattern is adding item costs to compute a final bill:`,
              code: `item1 = 45
item2 = 55
total = item1 + item2
print(f"Total Bill: {total}")  # Total Bill: 100`
            }
          ],
          cosmicTip: 'Remember that standard division \`/\` in Python always returns a decimal number (\`float\`), even when dividing evenly: \`8 / 4\` results in \`2.0\`.',
          syntaxTokens: [
            { token: '+', description: 'Addition operator' },
            { token: '-', description: 'Subtraction operator' },
            { token: '*', description: 'Multiplication operator' },
            { token: '/', description: 'Division operator (returns float)' }
          ]
        },
        practice: {
          objective: 'Calculate the total bill for two shopping items and print the result.',
          checklist: [
            'Create item1_price = 45',
            'Create item2_price = 55',
            'Calculate total = item1_price + item2_price',
            'Print formatted output: "Total Bill: 100"'
          ],
          expectedOutput: 'Total Bill: 100',
          starterCode: `# Store Checkout Calculator
item1_price = 45
item2_price = 55

# 1. Calculate the total bill:
total = 

# 2. Print: "Total Bill: <total>"
`,
          solutionCode: `item1_price = 45
item2_price = 55
total = item1_price + item2_price
print(f"Total Bill: {total}")`,
          hints: [
            {
              level: 1,
              title: 'Addition Operation',
              text: 'Add the two variables: `total = item1_price + item2_price`.'
            },
            {
              level: 2,
              title: 'Formatted Output',
              text: 'Print using an f-string: `print(f"Total Bill: {total}")`.'
            },
            {
              level: 3,
              title: 'Direct Code',
              text: 'Write:\ntotal = item1_price + item2_price\nprint(f"Total Bill: {total}")'
            }
          ],
          validator: (output, code) => {
            const hasAdd = /\+/.test(code);
            const matchesOutput = output.includes('Total Bill: 100');

            if (!hasAdd) {
              return { success: false, message: 'Make sure you use the + operator to sum the prices.' };
            }
            if (!matchesOutput) {
              return { success: false, message: `Expected "Total Bill: 100", but got "${output}". Check your calculation.` };
            }
            return { success: true, message: 'Arithmetic addition calculated correctly!' };
          }
        }
      },
      {
        id: 'm2-l2',
        moduleId: 'mod-2',
        title: 'Floor Division, Modulo & Exponents (//, %, **)',
        subtitle: 'Special arithmetic operations in Python',
        difficulty: 'Beginner',
        xp: 125,
        story: 'Beyond regular math, programmers frequently need to calculate remainders (like checking if a number is even or odd), divide into whole units, and compute exponential powers.',
        theory: {
          overview: `Python features three specialized arithmetic operators:
- **Modulo (\`%\`)**: Returns the remainder left over after division.
- **Floor Division (\`//\`)**: Divides and discards the remainder, keeping only the whole integer.
- **Exponentiation (\`**\`)**: Raises a base number to a power (e.g. \`2 ** 3\` is 2³ = 8).`,
          sections: [
            {
              title: '1. Modulo (%) - Finding Remainders',
              content: `The modulo operator is one of the most useful operators in coding:`,
              code: `print(17 % 5)  # 2 (because 17 = 5 * 3 + 2)
print(10 % 2)  # 0 (10 is evenly divisible by 2)`
            },
            {
              title: '2. Floor Division (//)',
              content: `Floor division divides and rounds down to the nearest integer:`,
              code: `print(17 // 5)  # 3 (5 goes into 17 three full times)`
            },
            {
              title: '3. Powers (**) - Exponentiation',
              content: `Use double asterisks \`**\` for powers:`,
              code: `print(2 ** 4)  # 16 (2 * 2 * 2 * 2)
print(5 ** 2)  # 25 (5 squared)`
            }
          ],
          cosmicTip: 'In Python, \`^\` is NOT exponentiation (it is a bitwise XOR operator). Always use double asterisks \`**\` to calculate powers!',
          syntaxTokens: [
            { token: '%', description: 'Modulo operator; returns division remainder' },
            { token: '//', description: 'Floor division; divides and truncates decimals' },
            { token: '**', description: 'Power operator; raises base to exponent' }
          ]
        },
        practice: {
          objective: 'Compute the remainder of 17 divided by 5, and compute 2 to the power of 5.',
          checklist: [
            'Calculate rem = 17 % 5',
            'Calculate pwr = 2 ** 5',
            'Print: "Remainder: 2"',
            'Print: "Power: 32"'
          ],
          expectedOutput: "Remainder: 2\nPower: 32",
          starterCode: `# 1. Calculate remainder of 17 % 5
rem = 

# 2. Calculate 2 to the power of 5 (2 ** 5)
pwr = 

# 3. Print the results:
# "Remainder: <rem>"
# "Power: <pwr>"
`,
          solutionCode: `rem = 17 % 5
pwr = 2 ** 5
print(f"Remainder: {rem}")
print(f"Power: {pwr}")`,
          hints: [
            {
              level: 1,
              title: 'Modulo & Exponent Operators',
              text: 'Use `rem = 17 % 5` and `pwr = 2 ** 5`.'
            },
            {
              level: 2,
              title: 'Print Results',
              text: 'Print `Remainder: {rem}` on line 1, and `Power: {pwr}` on line 2.'
            },
            {
              level: 3,
              title: 'Full Template',
              text: 'rem = 17 % 5\npwr = 2 ** 5\nprint(f"Remainder: {rem}")\nprint(f"Power: {pwr}")'
            }
          ],
          validator: (output, code) => {
            const hasMod = /%/.test(code);
            const hasPow = /\*\*/.test(code);
            const hasRem = output.includes('Remainder: 2');
            const hasPwr = output.includes('Power: 32');

            if (!hasMod || !hasPow) {
              return { success: false, message: 'Make sure to use % for remainder and ** for power.' };
            }
            if (!hasRem || !hasPwr) {
              return { success: false, message: `Expected Remainder: 2 and Power: 32, but got:\n${output}` };
            }
            return { success: true, message: 'Modulo and power operations verified!' };
          }
        }
      },
      {
        id: 'm2-l3',
        moduleId: 'mod-2',
        title: 'Type Conversions (Casting)',
        subtitle: 'Converting between string, integer, float, and bool',
        difficulty: 'Beginner',
        xp: 125,
        story: 'When users enter numbers on a website or keyboard, Python receives them as text strings. To perform arithmetic on them, we must convert ("cast") strings into numbers.',
        theory: {
          overview: `Python is strictly typed. If you try to add the string \`"50"\` to the number \`20\`, Python raises a \`TypeError\`!
          
Fortunately, Python includes simple built-in conversion functions:
- \`int(value)\`: Converts a string or float into an integer
- \`float(value)\`: Converts into a decimal number
- \`str(value)\`: Converts any number or object into a string`,
          sections: [
            {
              title: '1. Converting Strings to Integers',
              content: `Use \`int()\` to turn a text number into a real mathematical integer:`,
              code: `input_text = "50"
score = int(input_text)
bonus = 20
total = score + bonus
print(total)  # 70`
            },
            {
              title: '2. Checking Types with type()',
              content: `To inspect what type of data a variable holds, use \`type()\`:`,
              code: `print(type("100"))  # <class 'str'>
print(type(100))    # <class 'int'>
print(type(98.6))   # <class 'float'>`
            }
          ],
          cosmicTip: 'Only strings containing valid digits can be converted with \`int()\`. Calling \`int("hello")\` causes a \`ValueError\`.',
          syntaxTokens: [
            { token: 'int(...)', description: 'Converts value into an integer' },
            { token: 'float(...)', description: 'Converts value into a floating-point decimal' },
            { token: 'str(...)', description: 'Converts value into text string' }
          ]
        },
        practice: {
          objective: 'Convert a string score to an integer, add bonus points, and print the total.',
          checklist: [
            'raw_score is provided as "50" (string)',
            'Convert raw_score to an integer using int()',
            'Add bonus = 20 to get the final score',
            'Print: "Final Score: 70"'
          ],
          expectedOutput: 'Final Score: 70',
          starterCode: `# Type Conversion Practice
raw_score = "50"
bonus = 20

# 1. Convert raw_score to integer and add bonus:
final_score = 

# 2. Print "Final Score: <final_score>"
`,
          solutionCode: `raw_score = "50"
bonus = 20
final_score = int(raw_score) + bonus
print(f"Final Score: {final_score}")`,
          hints: [
            {
              level: 1,
              title: 'Type Casting',
              text: 'Use `int(raw_score)` to turn `"50"` into the integer `50`.'
            },
            {
              level: 2,
              title: 'Compute Total',
              text: 'Write `final_score = int(raw_score) + bonus`.'
            },
            {
              level: 3,
              title: 'Print Output',
              text: 'Print `Final Score: {final_score}` using an f-string.'
            }
          ],
          validator: (output, code) => {
            const hasInt = /int\s*\(\s*raw_score\s*\)/.test(code);
            const matchesOutput = output.includes('Final Score: 70');

            if (!hasInt) {
              return { success: false, message: 'You must convert raw_score using int(raw_score).' };
            }
            if (!matchesOutput) {
              return { success: false, message: `Expected "Final Score: 70", but got "${output}".` };
            }
            return { success: true, message: 'Type conversion successful! Score converted and calculated.' };
          }
        }
      }
    ]
  },
  {
    id: 'mod-3',
    number: 3,
    title: 'Conditional Statements',
    subtitle: 'Decision Making: If, Elif, Else, and Comparison Logic',
    icon: 'git-branch',
    badge: 'Logic Master',
    description: 'Learn how to make programs intelligent with if, else, elif branching, comparison operators, and boolean logic.',
    xpTotal: 300,
    lessons: [
      {
        id: 'm3-l1',
        moduleId: 'mod-3',
        title: 'If & Else Statements',
        subtitle: 'Comparing values and making basic decisions',
        difficulty: 'Beginner',
        xp: 150,
        story: 'In real life, you make decisions based on conditions: "If it rains, take an umbrella, else wear sunglasses." In programming, conditional statements give your code the ability to make smart decisions.',
        theory: {
          overview: `An \`if\` statement tests whether a condition is \`True\`. If it is True, Python executes the indented block beneath it. If it is False, Python jumps to the \`else\` block.
          
**Important**: Code inside an if or else block MUST be indented (usually by 4 spaces)!`,
          sections: [
            {
              title: '1. Comparison Operators',
              content: `To compare values, use:
- \`==\` (equal to)
- \`!=\` (not equal to)
- \`>\` (greater than)
- \`>=\` (greater than or equal to)
- \`<\` (less than)
- \`<=\` (less than or equal to)`,
              code: `marks = 75

if marks >= 50:
    print("Pass")
else:
    print("Fail")`
            },
            {
              title: '2. The Colon (:) and Indentation',
              content: `Notice the colon \`:\` at the end of the if line. In Python, a colon signals that an indented block is starting:`,
              code: `age = 18
if age >= 18:
    print("Eligible to vote")  # 4 spaces indent`
            }
          ],
          cosmicTip: 'Do not confuse \`=\` (assignment) with \`==\` (comparison). Use \`=\` to set a variable (\`x = 10\`), and \`==\` to check equality (\`if x == 10:\`).',
          syntaxTokens: [
            { token: 'if condition:', description: 'Runs the indented block if condition evaluates to True' },
            { token: 'else:', description: 'Runs the indented block if all preceding conditions are False' },
            { token: '== and !=', description: 'Check equality or inequality' }
          ]
        },
        practice: {
          objective: 'Check if a student passed their examination based on their marks.',
          checklist: [
            'marks is provided as 75',
            'If marks >= 50: print "Pass"',
            'Else: print "Fail"'
          ],
          expectedOutput: 'Pass',
          starterCode: `# Exam Result Checker
marks = 75

# Write your if-else condition:
# If marks >= 50: print "Pass"
# Else: print "Fail"

`,
          solutionCode: `marks = 75

if marks >= 50:
    print("Pass")
else:
    print("Fail")`,
          hints: [
            {
              level: 1,
              title: 'If Condition Syntax',
              text: 'Start with `if marks >= 50:` followed by an indented `print("Pass")`.'
            },
            {
              level: 2,
              title: 'Else Branch',
              text: 'Add `else:` at the original indentation, followed by indented `print("Fail")`.'
            },
            {
              level: 3,
              title: 'Full Template',
              text: 'if marks >= 50:\n    print("Pass")\nelse:\n    print("Fail")'
            }
          ],
          validator: (output, code) => {
            const hasIf = /\bif\s+marks\s*>=\s*50\s*:/i.test(code);
            const hasElse = /\belse\s*:/i.test(code);
            const matchesOutput = output.trim() === 'Pass';

            if (!hasIf) {
              return { success: false, message: 'Make sure you write if marks >= 50:' };
            }
            if (!hasElse) {
              return { success: false, message: 'Make sure to include the else: branch.' };
            }
            if (!matchesOutput) {
              return { success: false, message: `Expected output "Pass", but got "${output}".` };
            }
            return { success: true, message: 'Condition evaluated correctly! Pass output confirmed.' };
          }
        }
      },
      {
        id: 'm3-l2',
        moduleId: 'mod-3',
        title: 'Elif & Logical Operators (and, or, not)',
        subtitle: 'Multi-way decisions and compound conditions',
        difficulty: 'Beginner',
        xp: 150,
        story: 'Often you need to check more than two possibilities—like assigning letter grades (A, B, C, F), or checking multiple requirements at once. The `elif` (else-if) statement allows chaining multiple decisions.',
        theory: {
          overview: `Use \`elif\` to test secondary conditions if the first \`if\` condition was False. Python evaluates each condition in order from top to bottom, executing only the FIRST branch that is True.`,
          sections: [
            {
              title: '1. Multi-Way Decisions with Elif',
              content: `A grade classification example:`,
              code: `score = 85

if score >= 90:
    print("Grade A")
elif score >= 80:
    print("Grade B")
elif score >= 70:
    print("Grade C")
else:
    print("Needs Improvement")`
            },
            {
              title: '2. Logical Operators (and, or, not)',
              content: `Combine multiple checks in a single condition:
- **\`and\`**: Both conditions must be True
- **\`or\`**: At least one condition must be True
- **\`not\`**: Inverts the condition (True becomes False)`,
              code: `age = 22
has_id = True

if age >= 18 and has_id:
    print("Entry Granted")`
            }
          ],
          cosmicTip: 'Once Python finds a True condition in an if-elif chain, it executes that block and skips the rest of the chain completely!',
          syntaxTokens: [
            { token: 'elif condition:', description: 'Else-if; checks another condition if previous was False' },
            { token: 'and', description: 'Requires both sides to be True' },
            { token: 'or', description: 'Requires at least one side to be True' }
          ]
        },
        practice: {
          objective: 'Assign the correct grade for score = 85 using if, elif, and else.',
          checklist: [
            'score is set to 85',
            'If score >= 90: print "Grade A"',
            'Elif score >= 80: print "Grade B"',
            'Else: print "Grade C"'
          ],
          expectedOutput: 'Grade B',
          starterCode: `# Grade Classifier
score = 85

# Build your if-elif-else logic:
# 1. If score >= 90: print "Grade A"
# 2. Elif score >= 80: print "Grade B"
# 3. Else: print "Grade C"

`,
          solutionCode: `score = 85

if score >= 90:
    print("Grade A")
elif score >= 80:
    print("Grade B")
else:
    print("Grade C")`,
          hints: [
            {
              level: 1,
              title: 'Structure',
              text: 'Use `if score >= 90:`, followed by `elif score >= 80:`, then `else:`.'
            },
            {
              level: 2,
              title: 'Indentation',
              text: 'Remember to indent each `print(...)` statement by 4 spaces.'
            },
            {
              level: 3,
              title: 'Target Outcome',
              text: 'Since score is 85, it triggers the elif branch: `Grade B`.'
            }
          ],
          validator: (output, code) => {
            const hasIf = /\bif\s+score\b/i.test(code);
            const hasElif = /\belif\s+score\b/i.test(code);
            const hasElse = /\belse\s*:/i.test(code);
            const matchesOutput = output.trim() === 'Grade B';

            if (!hasIf || !hasElif || !hasElse) {
              return { success: false, message: 'You must include if, elif, and else statements.' };
            }
            if (!matchesOutput) {
              return { success: false, message: `Expected "Grade B", but got "${output}". Check your threshold numbers.` };
            }
            return { success: true, message: 'Grade B classified perfectly!' };
          }
        }
      }
    ]
  },
  {
    id: 'mod-4',
    number: 4,
    title: 'Loops & Loop Control Statements',
    subtitle: 'Repeating Tasks: For Loops, Range, While Loops, and Break/Continue',
    icon: 'repeat',
    badge: 'Loop Champion',
    description: 'Automate repetitive tasks using for loops, range sequences, while loops, and loop control statements.',
    xpTotal: 300,
    lessons: [
      {
        id: 'm4-l1',
        moduleId: 'mod-4',
        title: 'The For Loop & range()',
        subtitle: 'Counting, iterating over numbers, and repeat execution',
        difficulty: 'Beginner',
        xp: 150,
        story: 'Imagine writing 100 print statements just to count from 1 to 100! With loops, you can write two lines of code that repeat as many times as you want.',
        theory: {
          overview: `A **\`for\` loop** iterates through a sequence of items or numbers. In Python, the \`range()\` function generates a sequence of numbers:
- \`range(5)\`: 0, 1, 2, 3, 4 (starts at 0, stops before 5)
- \`range(1, 6)\`: 1, 2, 3, 4, 5 (starts at 1, stops before 6)
- \`range(1, 10, 2)\`: 1, 3, 5, 7, 9 (steps forward by 2)`,
          sections: [
            {
              title: '1. Basic For Loop with range()',
              content: `To count from 1 up to 5:`,
              code: `for i in range(1, 6):
    print(i)
# Prints:
# 1
# 2
# 3
# 4
# 5`
            },
            {
              title: '2. Repeating a Message',
              content: `You can repeat an action multiple times:`,
              code: `for i in range(3):
    print("Python is awesome!")`
            }
          ],
          cosmicTip: 'The stop number in \`range(start, stop)\` is never included! To count up to 5, the stop value must be 6: \`range(1, 6)\`.',
          syntaxTokens: [
            { token: 'for var in range(...):', description: 'Loops through sequence generated by range' },
            { token: 'range(start, stop)', description: 'Generates numbers from start up to stop - 1' }
          ]
        },
        practice: {
          objective: 'Write a for loop using range() to print numbers from 1 to 5 on separate lines.',
          checklist: [
            'Use a for loop',
            'Use range(1, 6)',
            'Print each number on its own line'
          ],
          expectedOutput: "1\n2\n3\n4\n5",
          starterCode: `# Counting from 1 to 5
# Use a for loop with range(1, 6) to print each number:

`,
          solutionCode: `for i in range(1, 6):
    print(i)`,
          hints: [
            {
              level: 1,
              title: 'Loop Header',
              text: 'Write `for i in range(1, 6):`.'
            },
            {
              level: 2,
              title: 'Loop Body',
              text: 'Indent 4 spaces and write `print(i)`.'
            },
            {
              level: 3,
              title: 'Complete Solution',
              text: 'for i in range(1, 6):\n    print(i)'
            }
          ],
          validator: (output, code) => {
            const hasFor = /\bfor\s+[a-zA-Z_][a-zA-Z0-9_]*\s+in\s+range/i.test(code);
            const lines = output.split('\n').map(l => l.trim()).filter(Boolean);
            const expectedLines = ['1', '2', '3', '4', '5'];
            const matches = expectedLines.every((n, i) => lines[i] === n);

            if (!hasFor) {
              return { success: false, message: 'You must use a for loop with range().' };
            }
            if (!matches) {
              return { success: false, message: `Expected numbers 1 through 5, but got:\n${output}` };
            }
            return { success: true, message: 'For loop counting verified from 1 to 5!' };
          }
        }
      },
      {
        id: 'm4-l2',
        moduleId: 'mod-4',
        title: 'While Loops & Loop Controls',
        subtitle: 'Condition-based repetition, break, and continue',
        difficulty: 'Beginner',
        xp: 150,
        story: 'While a `for` loop counts through a fixed list of numbers, a `while` loop continues running as long as a condition remains True. This is how games keep running until Game Over!',
        theory: {
          overview: `A **\`while\` loop** checks its condition before each iteration. If the condition is True, it executes the body. You must ensure the loop variable changes inside the loop to avoid an infinite loop!`,
          sections: [
            {
              title: '1. Basic While Loop Structure',
              content: `A simple counter loop:`,
              code: `count = 1
while count <= 3:
    print(f"Count: {count}")
    count += 1  # Crucial: increments count so loop eventually stops!`
            },
            {
              title: '2. Loop Controls: break & continue',
              content: `- **\`break\`**: Immediately exits the loop
- **\`continue\`**: Skips the rest of the current iteration and jumps to the next cycle`,
              code: `for num in range(1, 6):
    if num == 3:
        break  # Stops when num hits 3
    print(num)`
            }
          ],
          cosmicTip: 'Always increment your counter variable (e.g. \`count += 1\`) inside a while loop! If you forget, your loop will run infinitely.',
          syntaxTokens: [
            { token: 'while condition:', description: 'Repeats code while condition evaluates to True' },
            { token: 'break', description: 'Immediately stops and exits the loop' },
            { token: 'count += 1', description: 'Increments count by 1' }
          ]
        },
        practice: {
          objective: 'Write a while loop starting at count = 1 that prints "Count: 1", "Count: 2", "Count: 3".',
          checklist: [
            'Initialize count = 1',
            'Run while count <= 3',
            'Print formatted string: "Count: {count}"',
            'Increment count by 1 each iteration (count += 1)'
          ],
          expectedOutput: "Count: 1\nCount: 2\nCount: 3",
          starterCode: `# While Loop Counter
count = 1

# Write your while loop:

`,
          solutionCode: `count = 1
while count <= 3:
    print(f"Count: {count}")
    count += 1`,
          hints: [
            {
              level: 1,
              title: 'Loop Condition',
              text: 'Write `while count <= 3:`.'
            },
            {
              level: 2,
              title: 'Loop Body & Increment',
              text: 'Inside the loop, write `print(f"Count: {count}")` and `count += 1`.'
            },
            {
              level: 3,
              title: 'Full Template',
              text: 'count = 1\nwhile count <= 3:\n    print(f"Count: {count}")\n    count += 1'
            }
          ],
          validator: (output, code) => {
            const hasWhile = /\bwhile\b/i.test(code);
            const hasIncrement = /count\s*(\+=|=.*?\+)\s*1/.test(code);
            const hasLines = ['Count: 1', 'Count: 2', 'Count: 3'].every(l => output.includes(l));

            if (!hasWhile) {
              return { success: false, message: 'You must use a while loop.' };
            }
            if (!hasIncrement) {
              return { success: false, message: 'Remember to increment count with count += 1.' };
            }
            if (!hasLines) {
              return { success: false, message: `Expected Count: 1, 2, 3, but received:\n${output}` };
            }
            return { success: true, message: 'While loop executed and terminated cleanly!' };
          }
        }
      }
    ]
  },
  {
    id: 'mod-5',
    number: 5,
    title: 'Data Structures & Nested Data Types',
    subtitle: 'Lists, Dictionaries, and Nested Data (Matrices & Records)',
    icon: 'layers',
    badge: 'Data Architect',
    description: 'Learn how real-world data is structured using lists, dictionaries, nested lists (grids), and lists of dictionaries (records).',
    xpTotal: 400,
    lessons: [
      {
        id: 'm5-l1',
        moduleId: 'mod-5',
        title: 'Lists & Indexing',
        subtitle: 'Ordered collections, append(), and len()',
        difficulty: 'Beginner',
        xp: 125,
        story: 'Instead of creating separate variables for 50 different items, Python allows you to group them all inside a single list enclosed in square brackets `[...]`.',
        theory: {
          overview: `A **list** is an ordered, changeable collection of items. In Python, list items are **0-indexed** (the first item is at index 0, the second at index 1).`,
          sections: [
            {
              title: '1. Creating and Accessing Lists',
              content: `Access elements using square brackets \`list[index]\`:`,
              code: `fruits = ["Apple", "Banana", "Cherry"]

print(fruits[0])  # "Apple" (First item)
print(fruits[1])  # "Banana" (Second item)
print(fruits[-1]) # "Cherry" (Last item)`
            },
            {
              title: '2. Adding Items with .append() & Measuring with len()',
              content: `To add an item to the end of a list, use \`.append()\`. To count how many items are in the list, use \`len()\`:`,
              code: `colors = ["Red", "Green", "Blue"]
colors.append("Yellow")

print(len(colors))  # 4
print(colors)       # ['Red', 'Green', 'Blue', 'Yellow']`
            }
          ],
          cosmicTip: 'Remember that indices start at 0! In a list with 3 elements, the indices are 0, 1, and 2. Attempting to access index 3 causes an \`IndexError\`.',
          syntaxTokens: [
            { token: '[item1, item2]', description: 'List literal containing ordered items' },
            { token: 'list[0]', description: 'Accesses the first element of a list' },
            { token: 'list.append(item)', description: 'Adds an item to the end of the list' },
            { token: 'len(list)', description: 'Returns the total number of items' }
          ]
        },
        practice: {
          objective: 'Create a list of colors, append "Yellow", and print the total count of colors.',
          checklist: [
            'Initialize colors = ["Red", "Green", "Blue"]',
            'Append "Yellow" to colors using .append()',
            'Print formatted output: "Total colors: 4"'
          ],
          expectedOutput: 'Total colors: 4',
          starterCode: `# Colors List Controller
# 1. Initialize colors list:
colors = ["Red", "Green", "Blue"]

# 2. Append "Yellow":


# 3. Print "Total colors: <count>"

`,
          solutionCode: `colors = ["Red", "Green", "Blue"]
colors.append("Yellow")
print(f"Total colors: {len(colors)}")`,
          hints: [
            {
              level: 1,
              title: 'Appending to List',
              text: 'Use `colors.append("Yellow")`.'
            },
            {
              level: 2,
              title: 'Length Function',
              text: 'Get the length using `len(colors)`.'
            },
            {
              level: 3,
              title: 'Complete Solution',
              text: 'colors = ["Red", "Green", "Blue"]\ncolors.append("Yellow")\nprint(f"Total colors: {len(colors)}")'
            }
          ],
          validator: (output, code) => {
            const hasAppend = /colors\.append\s*\(\s*['"]Yellow['"]\s*\)/i.test(code);
            const matchesOutput = output.includes('Total colors: 4');

            if (!hasAppend) {
              return { success: false, message: 'You must use colors.append("Yellow") to add the color.' };
            }
            if (!matchesOutput) {
              return { success: false, message: `Expected "Total colors: 4", but got "${output}". Check len(colors).` };
            }
            return { success: true, message: 'List updated and length verified!' };
          }
        }
      },
      {
        id: 'm5-l2',
        moduleId: 'mod-5',
        title: 'Dictionaries (Key-Value Pairs)',
        subtitle: 'Labelled lookups, adding, and updating keys',
        difficulty: 'Beginner',
        xp: 125,
        story: 'While lists are indexed by numbers (0, 1, 2), a dictionary allows you to look up values by meaningful words called keys (e.g. looking up a person by "name", "age", or "city").',
        theory: {
          overview: `A **dictionary** is defined using curly braces \`{key: value}\`. Each key is linked to its value by a colon \`:\`, and pairs are separated by commas.`,
          sections: [
            {
              title: '1. Creating and Accessing Dictionaries',
              content: `Access a value by placing its key name in square brackets:`,
              code: `student = {
    "name": "Rohan",
    "grade": 10
}

print(student["name"])   # "Rohan"
print(student["grade"])  # 10`
            },
            {
              title: '2. Updating and Adding Keys',
              content: `To update an existing key or add a new one, assign to it with square brackets:`,
              code: `student["grade"] = 11      # Updated grade to 11
student["city"] = "Mumbai"  # Added new key "city"`
            }
          ],
          cosmicTip: 'Keys in a dictionary must be unique. If you assign a value to a key that already exists, Python updates it rather than creating a duplicate.',
          syntaxTokens: [
            { token: '{"key": value}', description: 'Dictionary structure with key-value pairs' },
            { token: 'dict[key]', description: 'Look up the value associated with key' },
            { token: 'dict[key] = value', description: 'Sets or updates a key to a new value' }
          ]
        },
        practice: {
          objective: 'Initialize a student dictionary, update their grade to 11, and print their status.',
          checklist: [
            'Create dictionary student with name: "Rohan", grade: 10',
            'Update student["grade"] to 11',
            'Print: "Student Rohan is in grade 11"'
          ],
          expectedOutput: 'Student Rohan is in grade 11',
          starterCode: `# Student Profile Dictionary
student = {
    "name": "Rohan",
    "grade": 10
}

# 1. Update grade to 11:


# 2. Print: "Student Rohan is in grade 11"

`,
          solutionCode: `student = {
    "name": "Rohan",
    "grade": 10
}
student["grade"] = 11
print(f"Student {student['name']} is in grade {student['grade']}")`,
          hints: [
            {
              level: 1,
              title: 'Updating Dictionary Key',
              text: 'Write `student["grade"] = 11`.'
            },
            {
              level: 2,
              title: 'Accessing Keys in f-string',
              text: 'Use `student["name"]` and `student["grade"]`.'
            },
            {
              level: 3,
              title: 'Direct Output',
              text: 'print(f"Student {student[\'name\']} is in grade {student[\'grade\']}")'
            }
          ],
          validator: (output, code) => {
            const hasUpdate = /student\[['"]grade['"]\]\s*=\s*11/.test(code);
            const matchesOutput = output.includes('Student Rohan is in grade 11');

            if (!hasUpdate) {
              return { success: false, message: 'Make sure you update student["grade"] = 11.' };
            }
            if (!matchesOutput) {
              return { success: false, message: `Expected "Student Rohan is in grade 11", but got "${output}".` };
            }
            return { success: true, message: 'Dictionary updated and status printed successfully!' };
          }
        }
      },
      {
        id: 'm5-l3',
        moduleId: 'mod-5',
        title: 'Nested Data Types (Lists of Lists & Records)',
        subtitle: '2D grids, matrices, and lists of student records',
        difficulty: 'Beginner',
        xp: 150,
        story: 'In real-world applications, data is rarely flat. A spreadsheet is a list of rows (lists inside a list), and a database query returns a list of user profiles (dictionaries inside a list)!',
        theory: {
          overview: `**Nested data structures** are data types placed inside other data types:
1. **List of Lists (2D Grid / Matrix)**: Useful for game boards, spreadsheets, and tables.
2. **List of Dictionaries (Records)**: The most common structure used by websites and APIs to represent collections of users, products, or students.`,
          sections: [
            {
              title: '1. Lists of Lists (2D Matrix)',
              content: `To access an element in a 2D grid, use double indexing: \`grid[row][column]\`:`,
              code: `matrix = [
    [10, 20],  # Row 0
    [30, 40]   # Row 1
]

print(matrix[0][1])  # 20 (Row 0, Column 1)
print(matrix[1][0])  # 30 (Row 1, Column 0)`
            },
            {
              title: '2. Lists of Dictionaries (Records)',
              content: `Access the item in the list by index, then access its dictionary key by name:`,
              code: `users = [
    {"username": "coder1", "level": 5},
    {"username": "py_master", "level": 12}
]

first_user = users[0]
print(first_user["username"])  # "coder1"

# Or in one single expression:
print(users[0]["level"])       # 5`
            }
          ],
          cosmicTip: 'Read double brackets from left to right: \`users[0]["username"]\` means "Take the 0th item from users, then look up the key \'username\' inside it".',
          syntaxTokens: [
            { token: 'matrix[row][col]', description: 'Accesses item in a nested 2D list' },
            { token: 'records[0]["key"]', description: 'Accesses a key from a dictionary inside a list' }
          ]
        },
        practice: {
          objective: 'Access a 2D matrix element and access a user record from a list of dictionaries.',
          checklist: [
            'matrix is provided as [[10, 20], [30, 40]]',
            'Print the element at row 0, column 1: matrix[0][1]',
            'users is provided as [{"username": "coder1", "level": 5}]',
            'Print: "User coder1 is level 5"'
          ],
          expectedOutput: "20\nUser coder1 is level 5",
          starterCode: `# Nested Data Types Practice
matrix = [
    [10, 20],
    [30, 40]
]

# 1. Print row 0, column 1 from matrix:


users = [
    {"username": "coder1", "level": 5}
]

# 2. Print: "User coder1 is level 5" using users[0]

`,
          solutionCode: `matrix = [
    [10, 20],
    [30, 40]
]
print(matrix[0][1])

users = [
    {"username": "coder1", "level": 5}
]
print(f"User {users[0]['username']} is level {users[0]['level']}")`,
          hints: [
            {
              level: 1,
              title: 'Matrix Indexing',
              text: 'Write `print(matrix[0][1])` to print `20`.'
            },
            {
              level: 2,
              title: 'Nested Dictionary Access',
              text: 'Use `users[0]["username"]` and `users[0]["level"]` in your print statement.'
            },
            {
              level: 3,
              title: 'Complete Solution',
              text: 'print(matrix[0][1])\nprint(f"User {users[0][\'username\']} is level {users[0][\'level\']}")'
            }
          ],
          validator: (output, code) => {
            const hasMatrixIndex = /matrix\s*\[\s*0\s*\]\s*\[\s*1\s*\]/.test(code);
            const hasNestedDict = /users\s*\[\s*0\s*\]\s*\[/.test(code);
            const has20 = output.includes('20');
            const hasUserStr = output.includes('User coder1 is level 5');

            if (!hasMatrixIndex) {
              return { success: false, message: 'You must access the matrix using matrix[0][1].' };
            }
            if (!hasNestedDict) {
              return { success: false, message: 'You must access the user using users[0]["username"].' };
            }
            if (!has20 || !hasUserStr) {
              return { success: false, message: `Expected output 20 and User coder1 is level 5, but got:\n${output}` };
            }
            return { success: true, message: 'Nested data types (2D lists and record lists) mastered!' };
          }
        }
      }
    ]
  }
];

// Professional Achievement Badges
const BADGES = [
  {
    id: 'badge-first-code',
    name: 'First Instruction',
    icon: 'terminal',
    description: 'Wrote your very first Python program and printed to the console.',
    color: 'from-cyan-500 to-blue-600',
    condition: (state) => state.completedLessons.includes('m1-l1')
  },
  {
    id: 'badge-variables-master',
    name: 'Variables Pioneer',
    icon: 'code-2',
    description: 'Mastered variables, sequential execution, and modern f-strings.',
    color: 'from-blue-500 to-indigo-600',
    condition: (state) => isModuleCompleted('mod-1', state)
  },
  {
    id: 'badge-math-wizard',
    name: 'Calculation Wizard',
    icon: 'calculator',
    description: 'Conquered arithmetic operators, modulo, floor division, and type casting.',
    color: 'from-amber-500 to-orange-600',
    condition: (state) => isModuleCompleted('mod-2', state)
  },
  {
    id: 'badge-logic-master',
    name: 'Logic Master',
    icon: 'git-branch',
    description: 'Mastered decision-making with if, elif, else, and boolean operators.',
    color: 'from-emerald-500 to-teal-600',
    condition: (state) => isModuleCompleted('mod-3', state)
  },
  {
    id: 'badge-loop-champion',
    name: 'Loop Champion',
    icon: 'repeat',
    description: 'Mastered repetitive task automation with for loops, range, and while loops.',
    color: 'from-violet-500 to-purple-600',
    condition: (state) => isModuleCompleted('mod-4', state)
  },
  {
    id: 'badge-data-architect',
    name: 'Data Architect',
    icon: 'layers',
    description: 'Mastered lists, dictionaries, 2D matrices, and nested records.',
    color: 'from-fuchsia-500 to-pink-600',
    condition: (state) => isModuleCompleted('mod-5', state)
  },
  {
    id: 'badge-python-graduate',
    name: 'Python Foundation Graduate',
    icon: 'award',
    description: 'Completed all 5 core foundation modules across the curriculum!',
    color: 'from-yellow-400 to-amber-600',
    condition: (state) => CURRICULUM.every(m => isModuleCompleted(m.id, state))
  },
  {
    id: 'badge-flawless',
    name: 'Flawless Run',
    icon: 'zap',
    description: 'Solved a coding challenge on your very first run without syntax errors.',
    color: 'from-cyan-400 to-emerald-500',
    condition: (state) => state.flawlessRuns > 0
  }
];

function isModuleCompleted(moduleId, state) {
  const mod = CURRICULUM.find(m => m.id === moduleId);
  if (!mod) return false;
  return mod.lessons.every(l => state.completedLessons.includes(l.id));
}

// Global export
if (typeof window !== 'undefined') {
  window.CURRICULUM = CURRICULUM;
  window.BADGES = BADGES;
  window.isModuleCompleted = isModuleCompleted;
}
if (typeof module !== 'undefined') {
  module.exports = { CURRICULUM, BADGES, isModuleCompleted };
}
