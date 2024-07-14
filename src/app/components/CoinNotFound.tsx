import Link from 'next/link'
import React from 'react'

const CoinNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen lg:h-96 p-4 text-center">
      <div className="max-w-md w-full space-y-8">
        <h2 className="text-2xl font-bold">You don&apos;t have any coins</h2>
        <p className="text-lg">Don&apos;t worry! You can easy start buy coin.</p>
        <div className="mt-6 primary">
          <Link href="/">
            Buy Coin Now
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CoinNotFound