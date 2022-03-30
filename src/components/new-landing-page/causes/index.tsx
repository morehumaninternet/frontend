import React, { forwardRef } from 'react'
import { BigCircle, SmallCircle } from '../../shared/circles'
import Info from './info'



const Causes = forwardRef(
  (_, ref): JSX.Element => {
    return (
      <section className="causes" ref={ref as any}>
        <div className="causes__content">
          <div
            style={{
              gridRow: '1/4',
              gridColumn: 1,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <img
              src="/dsa_hero.png"
              style={{
                borderRadius: '50%',
                border: '3px solid red'
              }}
            />
          </div>

          <div style={{ gridRow: '2', gridColumn: 3, display: 'grid', placeItems: 'center', padding: 10 }}>
            <div>
              <h2>Developing African Leaders Through Sports</h2>
              <p>Developing African Leaders Through Sports</p>
            </div>
          </div>

          <div
            style={{
              gridRow: '3/6',
              gridColumn: 3,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <img
              src="/dsa_hero.png"
              style={{
                borderRadius: '50%',
                border: '3px solid red'
              }}
            />
          </div>

          <div style={{ gridRow: '4', gridColumn: 1, display: 'grid', placeItems: 'center', padding: 10 }}>
            <div>
              <h2>Developing African Leaders Through Sports</h2>
              <p>Developing African Leaders Through Sports</p>
            </div>
          </div>

          <div
            style={{
              gridRow: '5/8',
              gridColumn: 1,
              display: 'grid',
              placeItems: 'center'
            }}
          >
            <img
              src="/dsa_hero.png"
              style={{
                borderRadius: '50%',
                border: '3px solid red'
              }}
            />
          </div>

          <div style={{ gridRow: '6', gridColumn: 3, display: 'grid', placeItems: 'center', padding: 10 }}>
            <div>
              <h2>Developing African Leaders Through Sports</h2>
              <p>Developing African Leaders Through Sports</p>
            </div>
          </div>


        </div>
      </section>
    )
  }
)

export default Causes
