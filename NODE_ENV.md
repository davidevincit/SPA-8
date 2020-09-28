
https://stackoverflow.com/a/16979503


NODE_ENV is an environment variable made popular by the express webserver framework. When a node application is run, it can check the value of the environment variable and do different things based on the value. NODE_ENV specifically is used (by convention) to state whether a particular environment is a production or a development environment. A common use-case is running additional debugging or logging code if running in a development environment.
Accessing NODE_ENV

You can use the following code to access the environment variable yourself so that you can perform your own checks and logic:

var environment = process.env.NODE_ENV

Assume production if you don't recognise the value:

var isDevelopment = environment === 'development'

if (isDevelopment) {
  setUpMoreVerboseLogging()
}

You can alternatively using express' app.get('env') function, but note that this is NOT RECOMMENDED as it defaults to "development", which may result in development code being accidentally run in a production environment - it's much safer if your app throws an error if this important value is not set (or if preferred, defaults to production logic as above).

Be aware that if you haven't explicitly set NODE_ENV for your environment, it will be undefined if you access it from process.env, there is no default.
Setting NODE_ENV

How to actually set the environment variable varies from operating system to operating system, and also depend on your user setup.

If you want to set the environment variable as a one-off, you can do so from the command line:

    linux & mac: export NODE_ENV=production
    windows: $env:NODE_ENV = 'production'

In the long term you should persist this so that it doesn't unset if you reboot - rather than list all the possible methods to do this, I'll let you search how to do that yourself!

Convention has dictated that there are two 'main' values you should use for NODE_ENV, either production or development, all lowercase. There's nothing to stop you from using other values, (test, for example, if you wish to use some different logic when running automated tests), but be aware that if you are using third party modules, they may explicitly compare with 'production' or 'development' to determine what to do, so there may be side effects that aren't immediately obvious.

Finally, Note that it's a really bad idea to try to set NODE_ENV from within a node application itself - if you do it will only apply to the process from which it was set, so things probably won't work like you expect them to. Don't do it - you'll regret it.
