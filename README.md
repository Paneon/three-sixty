# ![360-circle](./images/circle.png) Three Sixty

**The 360-degree feedback tool for teams!**

ThreeSixty is a tool to perform quantitative and unbiased [360-degree feedback][wiki-360] surveys.
It's strongly inspired by the approach of [https://github.com/ALRW/three-sixty](https://github.com/ALRW/three-sixty) and [https://github.com/Thermondo/threesixty](https://github.com/Thermondo/threesixty)

It stands on the shoulders of Google App Suite and relies on it to do all of its heavy lifting:

 - Using google forms to collect feedback data
 - Using google sheets to act as a data store
 - Using google apps scripts to provide the glue

### Setup and Installation

To setup and deply a new version of this application in your own G-Suite perform
the following:

```sh
git clone git@github.com:Macavity/three-sixty.git && cd three-sixty
```

```sh
npm install -g @google/clasp && npm install
```

```sh
clasp login
```

> :warning: At this point you may be asked to enable to google apps script API.
Through the script console. Be aware that once this has been done it can take up
to 24 hours for this change to take affect and the following commands will throw
errors until it is complete.

```sh
clasp create --type webapp
```

Then update your appsscript.json to the following:

```json
{
  "timeZone": "America/New_York",
  "dependencies": {
  },
  "webapp": {
    "access": "MYSELF",
    "executeAs": "USER_DEPLOYING"
  },
  "exceptionLogging": "STACKDRIVER"
}
```

finally to deploy and view your webapp

```sh
clasp push && clasp deploy
```

Before you can use the application you'll need to give it permission to access
certain google resources. For this you need to wait until the deployment has uploaded the script files and they are visible in the "Files" area of the Web-Editor.
To find the Web-Editor, navigate to: [Google apps scripts](https://script.google.com) and open the `Three-sixty` project.
Once the `App.gs` is available, activate it and click on `Run` > `Run function` > `any function is fine` in the navigation
bar. This will open a prompt and ask you to give this script the permissions it requires.

We can now access our running app by running the following in the command line:

```sh
clasp open --webapp
```

You should now see the following:

![feedback-homepage](./images/feedback-homepage.png)

If you receive the following error:

```
Missing required parameters: scriptId
```

Then you can open your deployed application by navigating to the
[Google apps scripts](https://script.google.com) page and opening your project
by clicking on `Three-sixty` and then `Open`.

Once the script has opened, navigate to `Publish` > `Deploy as web app` and
copy the url for the currently deployed version of your application. In a new
tab navigate to this url and you should see the current running version of your
360° feedback tool.

### Science

360-degree surveys can be great tools when performed correctly.
If they are not, you risk that the recipients of constructive feedback
will not fully accept the feedback or worse go into [denial](https://en.wikipedia.org/wiki/Denial).

#### Reflection

ThreeSixty does not share the results directly with employees. They should be
only shared in a guided reflection session (1on1-meeting).
It is important to help the receiver to reflect on feedback to increase
chances of acceptance. The results should be also accompanied by proposed
actions. Those actions should help the employee to overcome weaknesses.

Further reading:

*   [Reflection: a link between receiving and using assessment feedback](https://link.springer.com/article/10.1007/s10459-008-9124-4)

#### Confirmation Bias

ThreeSixty uses the same set of questions for all surveys.
Handpicking questions per employee will lead to biased results
since you will unconsciously select questions that confirm preexisting
assumptions.

As an added bonus you are able to compare results between employees.

Further reading:

*   https://en.wikipedia.org/wiki/Confirmation_bias
*   https://en.wikipedia.org/wiki/Inductive_reasoning

#### Data Quality and Validity

ThreeSixty is a yes-no (polar) survey tool. This does not compromise your data
quality. Polar surveys can increase response rates and participant satisfaction.
This allows them to yield better results than other survey techniques.

Bear in mind that questions are not interpreted separately but as a whole for
a given attribute. You do not survey for individual statements but a small
set of attributes.

Please note that yes-no surveys are vulnerable to suggestibility.
To avoid this, we recommend to use the simplest form of a statement.
It should not include negations. This should be also taken into
account when reviewing a set of questions.

The effect can be eliminated by only evaluating standard deviation between all
employees.

Further reading:

*   http://ro.uow.edu.au/commpapers/782/
*   https://en.wikipedia.org/wiki/Yes%E2%80%93no_questions



[wiki-360]: https://en.wikipedia.org/wiki/360-degree_feedback