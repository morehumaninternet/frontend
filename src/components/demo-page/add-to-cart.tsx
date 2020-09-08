import React from 'react'

function Rating({ stars, reviews }: { stars: number; reviews: number }) {
  return (
    <div className="reviews">
      {[...Array(stars)].map(n => (
        <span>
          <Star />
        </span>
      ))}
      <span>{reviews} Reviews</span>
    </div>
  )
}

function Star() {
  return (
    <svg
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9 0L11.0206 6.21885H17.5595L12.2694 10.0623L14.2901 16.2812L9 12.4377L3.70993 16.2812L5.73056 10.0623L0.440492 6.21885H6.97937L9 0Z"
        fill="#FADE60"
      />
    </svg>
  )
}

export default function AddToCart({ onAddToCart }: { onAddToCart: () => void }) {
  return (
    <div className="demo-content add-to-cart">
      <div className="text">
        <h1>The GoalCo 10X superpower suit</h1>
        <img className="suit-intext" src="/goalco-hero.png" />
        <Rating stars={5} reviews={9494} />
        <p>
          Take your goal achieving capabilities to the next level with our state
          of the art superpower suit.
        </p>
        <p>
          Made from the finest bio materials known to man and ethically sourced
          from planet Goalgon.
        </p>
        <div className="price">
          <h2>$365</h2>
          <button className="add-to-cart" onClick={() => onAddToCart()}>
            Add to Cart
          </button>
        </div>
        <div className="guarantee">Try risk-free, 100% happiness guaranteed</div>
      </div>

      <div className="img-container">
        <img className="suit-side" src="/goalco-hero.png" />
      </div>

    </div>
  )
}
