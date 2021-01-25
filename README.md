# hello-node

> Hello Unlaunch, from Node!
 
This is a **demo** project showing how to integrate the [Unlaunch Node SDK](https://github.com/unlaunch/nodejs-sdk) in Node applications.
For more details, read our [Getting Started](https://docs.unlaunch.io/docs/getting-started) tutorial.

Unlaunch is a free feature flag service. Please visit [https://www.unlaunch.io](https://www.unlaunch.io) to sign up for a new account today!

# Build Procedure
1. Download code. Edit src/hello.js file set your Unlaunch SDK_KEY and FEATURE_FLAG_KEY you want to evaluate as: 

```
const SDK_KEY = "your-sdk-key";
const FEATURE_FLAG_KEY = "your-flag-key";
```

By default, we have set these values to an example feature flag. So you can run the code as is.

Then on on the command line, type:

```
npm install
npm start
```

When you run the project, it will print something like:

```
[DEMO] Feature returned variation: on. Evaluation reason: Default Rule served.
```

