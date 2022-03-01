import { ContactSupportOutlined } from '@material-ui/icons'
import React from 'react'

const phrases: ReadonlyArray<string> = [
  'more human internet',
  'join international community',
  'Boost Your Resume',
  'Meet Amazing People',
  'Learn New Skills',
  'Use Latest Technology',
  'Mentor Diverse Community',
  'Live Your Values',
]

const AnimateWordsArray = [{color:'', words:['']}, {color:'', words: ['']}, {color:'', words: ['']}]
const createWordGroups = function(phrasesArray : ReadonlyArray<string>) {
  phrasesArray.forEach((phrase, index) => {
    let wordsArray = phrase.split(' ') 
    if (wordsArray.length !== 3) {
      throw new Error (`The ${index}th phrase (${phrase}) need to be exact 3 words`)
    }
    wordsArray.forEach((word, i) => {
        if(i === 0 || i === 2) {
          AnimateWordsArray[i].color= 'human-blue' 
        }else if (i === 1) {
          AnimateWordsArray[i].color= 'human-pink' 
        }
        AnimateWordsArray[i].words[0] ? AnimateWordsArray[i].words.push(word) : AnimateWordsArray[i].words[0] = word
    })
  })
  return AnimateWordsArray;
}

const wordGroups = createWordGroups(phrases)

// const wordGroups: AnimateWords = [
//   { color: 'human-blue', words: ['more', 'beautiful', 'maintainable', 'perfect', 'quux', 'eiio', 'bug', 'zug', 'hug'] },
//   { color: 'human-pink', words: ['human', 'foo', 'bar', 'baz', 'quux', 'eiio', 'bug', 'zug', 'hug'] },
//   { color: 'human-blue', words: ['internet', 'zing', 'bing', 'foo', 'quux', 'eiio', 'bug', 'zug', 'hug'] },
// ]

const animationWordsCount = wordGroups.length
const animationFramesCount = wordGroups[0].words.length
const logoAnimationLastDelay = (0.5 + 0.1 * animationWordsCount + 1.25 * (animationFramesCount - 1)).toString().concat('s')

export default function MHIHeaderLogos({ additionalClassNames }: { additionalClassNames?: string }): JSX.Element {
  return (
    <>
      <div className="mhi-rotating-logo">
        <svg
          className="mhi-rotating-logo-dots"
          style={{ animationDelay: logoAnimationLastDelay, animationDuration: '1.5s' }}
          viewBox="0 0 49 49"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle className="bottom-left human-blue" cx="11.2498" cy="34.4704" r="11.25" />
          <circle className="top-right human-pink" cx="30.7503" cy="14.9704" r="11.25" />
        </svg>
        <div className="mhi-rotating-logo-words" style={{ animationDelay: logoAnimationLastDelay }}>
          {wordGroups.map((wordGroup, i) => (
            <div className={`rotatingText ${wordGroup.color}`} key={i}>
              <div
                className="rotatingText-adjective"
                style={{
                  animationName: 'rotate-nothing',
                  animationDuration: `${0.5 + 0.1 * i}s`,
                  animationDelay: '0s',
                  position: 'static',
                }}
              >
                {wordGroup.words[0]}
              </div>
              {wordGroup.words.map((word, j) => (
                <div
                  className="rotatingText-adjective"
                  key={j}
                  style={{
                    animationDelay: `${0.5 + 0.1 * i + 1.25 * (j - 1)}s`,
                    ...(j === 0
                      ? {
                          animationName: 'rotate-first',
                        }
                      : {}),
                  }}
                >
                  {word}
                </div>
              ))}
              <div
                className="rotatingText-adjective"
                style={{
                  animationName: 'rotate-last',
                  animationDelay: `${0.5 + 0.1 * i + 1.25 * (wordGroup.words.length - 1)}s`,
                  animationFillMode: 'forwards',
                }}
              >
                {wordGroup.words[0]}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mhi-rotating-buttons">
        <button className="mhi-button rotatingButton-adjective" style={{animationDelay: `${logoAnimationLastDelay}`, animationDuration: '1.5s'}} >For Contributors</button>
        <button className="mhi-button rotatingButton-adjective" style={{animationDelay: `${logoAnimationLastDelay}`, animationDuration: '1.5s'}} >For Causes</button>
      </div>
    </>
  )
}
