import React, { forwardRef } from 'react'

type CauseProps = { imgSrc: string, borderColor: string, heading: string, description: string }

const causes: ReadonlyArray<CauseProps> = [
  {
    imgSrc: '/causes/dsa_hero.png',
    borderColor: '#FADE60',
    heading: 'Developing African Leaders Through Sports',
    description: `More Human Internet helped redesign Dream Sports Africa's website, positioning it as the preeminent organization offering life skills education through sports in Africa`,
  },
  {
    imgSrc: '/causes/lhkh_hero.png',
    borderColor: '#FA759E',
    heading: 'Stewarding Hawaii Across Generations',
    description: `Through our partnership with Livable Hawaii Kai Hui, we are aiming to bring 1500 volunteers of all ages to care for Hawaii’s cultural and natural resources.`,
  },
  {
    imgSrc: '/causes/roar_hero.png',
    borderColor: '#164176',
    heading: 'Bringing attention to problems on the web',
    description: `Roar! by More Human Internet enables users of the web Turn a tweet into a Roar so experts and maintainers see the issue and offer solutions.`,
  },
]

const CauseImage = ({ src, borderColor }: { src: string, borderColor: string }) => (
  <div className="cause__image">
    <img src={src} style={{ borderColor }} />
  </div>
)

const CauseTextContent = ({ heading, description }: { heading: string, description: string }) => (
  <div className="cause__text-content">
    <div>
      <h2>{heading}</h2>
      <p>{description}</p>
    </div>
  </div>
)

const Cause = ({ imgSrc, borderColor, heading, description }: CauseProps) => (
  <>
    <CauseImage src={imgSrc} borderColor={borderColor}/>
    <CauseTextContent
      heading={heading}
      description={description}
    />
  </>
)

const Causes = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="causes" ref={ref as any}>
        <div className="causes__content">
          {causes.map((props) => (
            <Cause key={props.heading} {...props} />
          ))}
        </div>
      </section>
    )
  }
)

export default Causes
