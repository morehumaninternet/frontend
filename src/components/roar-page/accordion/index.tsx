import React from 'react'
import AccordionItem from './item'

const Accordion = (): JSX.Element => {
  return (
    <section className="accordion">
      <AccordionItem
        header="What is Roar?"
        description="Roar is a free, non-profit web extension that automatically captures a snapshot of any online issue and addresses a tweet to the site's maintainer. Turn a tweet into a Roar as experts and maintainers see the issue and offer solutions."
      />
      <AccordionItem
        header="Why Roar?"
        description="More Human Internet is a community of digital activists working to make the internet a more civil and transparent place, and Roar is our first product. We want to make the simple act of asking for help a more seamless process, and we want to encourage human solutions."
      />
      <AccordionItem
        header="Why Twitter?"
        description="Twitter is where the people are! Issues posted on Twitter get high visibility and rapid solutions from maintainers."
      />
      <AccordionItem
        header="What's next?"
        description="The extension is just the beginning. As more people use Roar to find solutions online, we hope to build a network of human-centric web citizens identifying, documenting and solving issues online. We like to think of this group as the internet's helpdesk, and with more reported issues, that group can start to identify similar issues and surface solutions to further streamline the process of getting an answer."
      />
      <AccordionItem
        header="I'm a bit of a digital activist myself..."
        description="We're building a community of technologists creating a more human internet. Roar is this group's first product, and your idea could be next! Join our Slack channel to get involved or stay in the loop by joining our mailing list."
      />
    </section>
  )
}

export default Accordion
