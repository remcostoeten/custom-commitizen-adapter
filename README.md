# Cleaner Commitizen Adapter

A custom Commitizen adapter/config for creating standardized commit messages with fewer terminal prompts and boilerplate. ✨

<small>This stuff makes it look like you know what you're doing, dawg. 👀</small>

## Installation

Since it's an adapter for Commitizen, you need to have Commitizen installed globally:

```sh
# Install Commitizen globally
npm install -g commitizen

# Install this package globally
npm install -g cleaner-commitizen-adapter
```

Commitizen does not support custom configuration via their own config file. To use this adapter you need to create a `.czrc` file in your home directory and set the path to the adapter. Edit/create the file with `vim ~/.czrc` and add the following line: `{ "path": "cleaner-commitizen-adapter" }`. This will tell Commitizen to use the custom adapter.

Alternatively, you can run the following command to create the file with the correct content in one go:

```sh
echo '{ "path": "cleaner-commitizen-adapter" }' > ~/.czrc
```

## Usage

To use this adapter with Commitizen, run:

```sh
cz
```

Answer the prompts to generate a standardized commit message.

## Efficient Usage with zsh Alias

If you find the cz command annoying or having to git add, or push prior to running cz, you can create an alias in your `.zshrc` file to run the CLI tool with a single command.

1. Open `.zshrc` <small>Or `.bashrc` if you're using bash</small>:

   ```sh
   vim ~/.zshrc
   ```

2. Add alias:

   ```sh
   alias commit='cz'
   ```
   This allows you to type commit which could be more intuitive than cz.

   Another one which I personally use, but must be used with caution due to the adding everything and pushing instantly is

   ```sh
    alias push='git add . && cz" && git push'
    ```

Now, you can use the alias `commit` to quickly run the CLI tool.
