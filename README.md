# Cleaner Commitizen Adapter

A custom Commitizen adapter/config for creating standardized commit messages with fewer terminal prompts and boilerplate. ✨

<small>This stuff makes it look like you know what you're doing, dawg. 👀</small>

![t-rec](https://github.com/remcostoeten/custom-commitizen-adapter/assets/57683378/7fdbcd55-20b8-43b3-b995-41c70545d934)

```clis
commit a401633a9362c3940c447daeaebaf264582da0f7
Author: Remco Stoeten <remcostoeten@hotmail.com>
Date:   Sat Jun 8 06:54:43 2024 +0200
chore: This video is such a chore man....
```



## Installation

Since it's an adapter for Commitizen, you need to have Commitizen installed globally:

```bash

# Install Commitizen globally

npm install -g commitizen

# Install this package globally

npm install -g cleaner-commitizen-adapter
```

Commitizen does not support custom configuration via their own config file. To use this adapter you need to create a `.czrc` file in your home directory and set the path to the adapter. Edit/create the file with `vim ~/.czrc` and add the following line: `{ "path": "cleaner-commitizen-adapter" }`. This will tell Commitizen to use the custom adapter.

Alternatively, you can run the following command to create the file with the correct content in one go:

```bash
echo '{ "path": "cleaner-commitizen-adapter" }' > ~/.czrc
```

## Usage

To use this adapter with Commitizen, run:

```bash
cz
```

Answer the prompts to generate a standardized commit message.

### Prompts

1. **Type of Change**: Select the type of change you are committing. Options include:

   - `feat`: A new feature
   - `fix`: A bug fix
   - `docs`: Documentation only changes
   - `style`: Changes that do not affect the meaning of the code
   - `refactor`: A code change that neither fixes a bug nor adds a feature
   - `test`: Adding missing tests or correcting existing tests
   - `chore`: Changes to the build process or auxiliary tools

2. **Commit Message**: Write a short, descriptive commit message.

## Efficient Usage with zsh Alias

If you find the `cz` command annoying or having to `git add`, or push prior to running `cz`, you can create an alias in your `.zshrc` file to run the CLI tool with a single command.

1. Open `.zshrc` <small>Or `.bashrc` if you're using bash</small>:

   ```bash
   vim ~/.zshrc
   ```

2. Add alias:

   ```bash
   alias commit='cz'
   ```

Now, you can use the alias `commit` to quickly run the CLI tool. This allows you to type `commit` which could be more intuitive than `cz`.

Another one which I personally use, but must be used with caution due to the adding everything and pushing instantly is:

```bash
alias push='git add . && cz && git push'
```

A safe way to use this, but which is a little bit more time-consuming is to use the following alias:

```bash
alias push='git add . && cz && echo "You are about to push $(git diff --cached --numstat | wc -l) files." && echo "Are you sure you want to push these changes? (y/n/c) [Yes/No - commit only/No - abort all]" && read ans && if [[$ans = "y"]]; then git push; elif [[$ans = "n"]]; then echo "Changes committed, but not pushed."; else echo "Operation aborted."; git reset HEAD~; fi'
```

This will ask you after the commit if you want to continue with X files or not, giving you the option to push, quit, or only commit.

xxx love y'all,

[Remco Stoeten](https://remcostoeten.com)
