import React from 'react'
import Step from './step'
import { FindAnIssueIcon, TakeAScreenshotIcon, TweetAboutItIcon, GetItFixedIcon } from './icons'

const Steps = (): JSX.Element => {
    return (
        <section className="steps-section full-width">
            <h1 className="steps-title">Bring attention to problems on the web</h1>
            <div className="steps">
                <Step
                    title="1. Find an issue"
                    description="Search is broken? Link goes nowhere? Image won’t load? Let’s get this fixed!"
                    icon={<FindAnIssueIcon />}
                />
                <Step
                    title="2. Take a screenshot"
                    description="Open the Roar! extension to automatically capture a screenshot of the issue."
                    icon={<TakeAScreenshotIcon />}
                />
                <Step
                    title="3. Tweet about it"
                    description="Explain the problem and send a tweet directly to the site’s maintainers, autofilled by Roar."
                    icon={<TweetAboutItIcon />}
                />
                <Step
                    title="4. Get it fixed"
                    description="Celebrate as maintainters and experts come to your aid with solutions and support."
                    icon={<GetItFixedIcon />}
                />
            </div>
        </section>
    )
}

export default Steps
