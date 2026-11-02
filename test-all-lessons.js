const { PythonEngine } = require('./py-engine.js');
const { CURRICULUM } = require('./curriculum.js');

const engine = new PythonEngine();

console.log('--- RUNNING ALL BEGINNER LESSON VALIDATIONS ---');
let allPassed = true;
let totalLessons = 0;

CURRICULUM.forEach((mod) => {
  console.log(`\n=== Module ${mod.number}: ${mod.title} ===`);
  mod.lessons.forEach((lesson) => {
    totalLessons++;
    const solution = lesson.practice.solutionCode;
    const runResult = engine.runLocalPython(solution);
    if (runResult.error) {
      console.error(`[FAIL - RUN ERROR] ${lesson.id} (${lesson.title}):`, runResult.error);
      allPassed = false;
      return;
    }

    const validation = lesson.practice.validator(runResult.stdout, solution);
    if (validation.success) {
      console.log(`[PASS] ${lesson.id} (${lesson.title})`);
      console.log(`       Output: ${JSON.stringify(runResult.stdout.replace(/\n/g, '\\n'))}`);
    } else {
      console.error(`[FAIL - VALIDATION] ${lesson.id} (${lesson.title}):`, validation.message);
      console.error(`       Output was: ${JSON.stringify(runResult.stdout)}`);
      allPassed = false;
    }
  });
});

if (allPassed) {
  console.log(`\n>>> ALL ${totalLessons} BEGINNER LESSONS PASSED 100%! <<<`);
} else {
  console.error('\n>>> SOME LESSONS FAILED! <<<');
  process.exit(1);
}
