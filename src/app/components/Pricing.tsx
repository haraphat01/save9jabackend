"use client"
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

const tiers = [
  {
    name: 'Free',
    price: {
      monthly: '$0',
      yearly: '$0'
    },
    description: 'Basic safety features for everyone',
    features: [
      'Emergency alert sending',
      'Basic profile management',
      'Community safety alerts',
      'Basic safety tips and resources',
      'Standard response time',
      '1 emergency contact',
      '1 device session'
      
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium',
    price: {
      monthly: '$4.99',
      yearly: '$53.89'
    },
    description: 'Enhanced safety features for individuals',
    features: [
      'Everything in Free, plus:',
      'Unlimited emergency contacts',
      'Priority emergency response',
      'Advanced location tracking',
      'Real-time location sharing',
      'Custom emergency messages',
      'Multiple device support',
      'Geofencing alerts',
      'Advanced shake detection',
      'Premium support',
      '2 device sessions'
    ],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Family',
    price: {
      monthly: '$9.99',
      yearly: '$107.89'
    },
    description: 'Complete safety for your entire family',
    features: [
      'Everything in Premium, plus:',
      'Up to 6 family members',
      'Family location sharing',
      'Group emergency alerts',
      'Family safety reports',
      'Custom safety routes',
      '24/7 emergency assistance',
      'Personalized recommendations',
      'Secure cloud backup',
    ],
    cta: 'Coming Soon',
    highlighted: false,
  },
];

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section className="bg-white py-24 sm:py-32" id="pricing">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">Pricing</h2>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Choose the right plan for you
          </p>
        </div>
        <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
          Whether you're looking for basic safety features or comprehensive family protection,
          we have a plan that fits your needs.
        </p>

        {/* Billing toggle */}
        <div className="mt-8 flex justify-center">
          <div className="relative flex items-center p-1 rounded-full bg-gray-100">
            <button
              onClick={() => setIsYearly(false)}
              className={`${
                !isYearly ? 'bg-white shadow-sm' : 'text-gray-500'
              } relative w-32 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`${
                isYearly ? 'bg-white shadow-sm' : 'text-gray-500'
              } relative w-32 py-2 text-sm font-medium rounded-full transition-all duration-200 ease-in-out`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded-full">
                Save 10%
              </span>
            </button>
          </div>
        </div>

        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 ${
                tier.highlighted ? 'relative z-10 shadow-xl' : ''
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-5 left-0 right-0 mx-auto w-32 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-3 py-1 text-sm font-semibold leading-6 text-white text-center">
                  Most popular
                </div>
              )}
              <div>
                <div className="flex items-center justify-between gap-x-4">
                  <h3 className="text-lg font-semibold leading-8 text-gray-900">{tier.name}</h3>
                </div>
                <p className="mt-4 text-sm leading-6 text-gray-600">{tier.description}</p>
                <p className="mt-6 flex items-baseline gap-x-1">
                  <span className="text-4xl font-bold tracking-tight text-gray-900">
                    {isYearly ? tier.price.yearly : tier.price.monthly}
                  </span>
                  <span className="text-sm font-semibold leading-6 text-gray-600">
                    {isYearly ? '/year' : '/month'}
                  </span>
                </p>
                <ul role="list" className="mt-8 space-y-3 text-sm leading-6 text-gray-600">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <FaCheck className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <a
                href="#"
                className={`mt-8 block rounded-md px-3 py-2 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.highlighted
                    ? 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600'
                    : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus-visible:outline-indigo-600'
                }`}
              >
                {tier.cta}
              </a>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Need a custom plan? <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">Contact us</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Pricing; 