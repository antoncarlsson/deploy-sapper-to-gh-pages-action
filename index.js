const core = require('@actions/core');
const exec = require('@actions/exec').exec;
const github = require('@actions/github');
const cp = require('@actions/io').cp;

(async () => {
  try {
    const token = core.getInput('access-token');
    const url = `https:/${token}@github.com/${github.context.repo.owner}/${github.context.repo.repo}.git`;

    await exec('npm install');
    await exec('npm run export');
    await cp('./CNAME', './__sapper__/export/CNAME', { force: true });

    await exec('git init', [], { cwd: './__sapper__/export' });
    await exec('git config user.name', [github.context.actor], {
      cwd: './__sapper__/export'
    });
    await exec(
      'git config user.email',
      [`${github.context.actor}@users.noreply.github.com`],
      { cwd: './__sapper__/export' }
    );
    await exec('git add', ['.'], { cwd: './__sapper__/export ' });
    await exec(
      'git commit',
      ['-m', `Deploy via Sapper Publish Action for ${github.context.sha}`],
      { cwd: './__sapper__/export' }
    );
    await exec('git push', ['-f', url, 'master:master'], {
      cwd: './__sapper__/export'
    });
  } catch (error) {
    console.error('Could not complete deployment!');
    core.setFailed(error.message);
  } finally {
    console.log('Successfully completed deployment!');
  }
})();
