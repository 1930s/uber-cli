import build from './build';

import TimeUnit from '../../../data/TimeUnit';
import DistanceUnit from '../../../data/DistanceUnit';

jest.unmock('convert-units');

let expected;
let table;
let estimates;

const validateTable = (presentationUnits) => {
  console.log('expected table');
  console.log(expected);

  table = build({ estimates, presentationUnits });

  console.log('built table');
  console.log(table);

  expect(table).toEqual(expected);
};

describe('#build', () => {
  // tests use emojis and assumes process.platform = darwin
  // apologies in advance if this causes problems

  const distance = {
    value: 12.34,
    unit: DistanceUnit.MILE,
  };
  const duration = {
    length: 5678,
    unit: TimeUnit.SECOND,
  };
  const currencyCode = 'USD';
  const start = { name: 'jae' };
  const end = { name: 'baebae' };
  const firstProduct = {
    productName: 'first product',
    range: {
      low: 10,
      high: 20,
      currencyCode,
    },
    distance,
    duration,
  };
  const secondProduct = {
    productName: 'second product',
    range: {
      low: 8,
      high: 16,
      currencyCode,
    },
    distance,
    duration,
  };
  const thirdProduct = {
    productName: 'third product',
    range: {
      low: 6,
      high: 12,
      currencyCode,
    },
    distance,
    duration,
  };
  const taxiProduct = {
    productName: 'TAXI',
    range: {
      low: 4,
      high: 8,
      currencyCode,
    },
    distance,
    duration,
  };

  const defaultEstimates = {
    estimates: [
      firstProduct,
      secondProduct,
      thirdProduct,
    ],
    start,
    end,
  };

  it('should build sorted table', () => {
    estimates = defaultEstimates;
    expected = '\u001b[90m┌────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬────────────────────────\u001b[39m\u001b[90m┬──────────┐\u001b[39m\n\u001b[90m│\u001b[39m       🚘        \u001b[90m│\u001b[39m    💸    \u001b[90m│\u001b[39m     🔃     \u001b[90m│\u001b[39m           ⏳            \u001b[90m│\u001b[39m 😬 Surge😬 \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m third product  \u001b[90m│\u001b[39m $6-$12  \u001b[90m│\u001b[39m 12.34 mi. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m second product \u001b[90m│\u001b[39m $8-$16  \u001b[90m│\u001b[39m 12.34 mi. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m first product  \u001b[90m│\u001b[39m $10-$20 \u001b[90m│\u001b[39m 12.34 mi. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────┴───────────┴────────────────────────┴──────────┤\u001b[39m\n\u001b[90m│\u001b[39m       📍        \u001b[90m│\u001b[39m jae                                                     \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m       🔚        \u001b[90m│\u001b[39m baebae                                                  \u001b[90m│\u001b[39m\n\u001b[90m└────────────────\u001b[39m\u001b[90m┴─────────────────────────────────────────────────────────┘\u001b[39m';
    validateTable(DistanceUnit.MILE);
  });

  it('should build table without TAXI product', () => {
    estimates = {
      estimates: [
        firstProduct,
        secondProduct,
        thirdProduct,
        taxiProduct,
      ],
      start,
      end,
    };

    expected = '\u001b[90m┌────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬────────────────────────\u001b[39m\u001b[90m┬──────────┐\u001b[39m\n\u001b[90m│\u001b[39m       🚘        \u001b[90m│\u001b[39m    💸    \u001b[90m│\u001b[39m     🔃     \u001b[90m│\u001b[39m           ⏳            \u001b[90m│\u001b[39m 😬 Surge😬 \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m third product  \u001b[90m│\u001b[39m $6-$12  \u001b[90m│\u001b[39m 12.34 mi. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m second product \u001b[90m│\u001b[39m $8-$16  \u001b[90m│\u001b[39m 12.34 mi. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m first product  \u001b[90m│\u001b[39m $10-$20 \u001b[90m│\u001b[39m 12.34 mi. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────┴───────────┴────────────────────────┴──────────┤\u001b[39m\n\u001b[90m│\u001b[39m       📍        \u001b[90m│\u001b[39m jae                                                     \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m       🔚        \u001b[90m│\u001b[39m baebae                                                  \u001b[90m│\u001b[39m\n\u001b[90m└────────────────\u001b[39m\u001b[90m┴─────────────────────────────────────────────────────────┘\u001b[39m';
    validateTable(DistanceUnit.MILE);
  });

  it('should build table converting to kilometers', () => {
    estimates = defaultEstimates;
    expected = '\u001b[90m┌────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬────────────────────────\u001b[39m\u001b[90m┬──────────┐\u001b[39m\n\u001b[90m│\u001b[39m       🚘        \u001b[90m│\u001b[39m    💸    \u001b[90m│\u001b[39m     🔃     \u001b[90m│\u001b[39m           ⏳            \u001b[90m│\u001b[39m 😬 Surge😬 \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m third product  \u001b[90m│\u001b[39m $6-$12  \u001b[90m│\u001b[39m 19.86 km. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m second product \u001b[90m│\u001b[39m $8-$16  \u001b[90m│\u001b[39m 19.86 km. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m first product  \u001b[90m│\u001b[39m $10-$20 \u001b[90m│\u001b[39m 19.86 km. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 🚫        \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────┴───────────┴────────────────────────┴──────────┤\u001b[39m\n\u001b[90m│\u001b[39m       📍        \u001b[90m│\u001b[39m jae                                                     \u001b[90m│\u001b[39m\n\u001b[90m├────────────────\u001b[39m\u001b[90m┼─────────────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m       🔚        \u001b[90m│\u001b[39m baebae                                                  \u001b[90m│\u001b[39m\n\u001b[90m└────────────────\u001b[39m\u001b[90m┴─────────────────────────────────────────────────────────┘\u001b[39m';
    validateTable(DistanceUnit.KILOMETER);
  });

  it('should build table with surge multiplier', () => {
    // probably a better way to do this but quick and dirty for now

    const firstProductWithSurge = {
      productName: 'first product with surge',
      range: {
        low: 10,
        high: 20,
        currencyCode,
      },
      distance,
      duration,
      surgeMultiplier: 1.23,
    };
    const secondProductWithSurge = {
      productName: 'second product with surge',
      range: {
        low: 8,
        high: 16,
        currencyCode,
      },
      distance,
      duration,
      surgeMultiplier: 2.34,
    };
    const thirdProductWithSurge = {
      productName: 'third product with surge',
      range: {
        low: 6,
        high: 12,
        currencyCode,
      },
      distance,
      duration,
      surgeMultiplier: 3.45,
    };
    estimates = {
      estimates: [
        firstProductWithSurge,
        secondProductWithSurge,
        thirdProductWithSurge,
      ],
      start,
      end,
    };

    expected = '\u001b[90m┌───────────────────────────\u001b[39m\u001b[90m┬─────────\u001b[39m\u001b[90m┬───────────\u001b[39m\u001b[90m┬────────────────────────\u001b[39m\u001b[90m┬──────────┐\u001b[39m\n\u001b[90m│\u001b[39m             🚘             \u001b[90m│\u001b[39m    💸    \u001b[90m│\u001b[39m     🔃     \u001b[90m│\u001b[39m           ⏳            \u001b[90m│\u001b[39m 😬 Surge😬 \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m third product with surge  \u001b[90m│\u001b[39m $6-$12  \u001b[90m│\u001b[39m 19.86 km. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 3.45x 😬  \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m second product with surge \u001b[90m│\u001b[39m $8-$16  \u001b[90m│\u001b[39m 19.86 km. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 2.34x 😬  \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼─────────\u001b[39m\u001b[90m┼───────────\u001b[39m\u001b[90m┼────────────────────────\u001b[39m\u001b[90m┼──────────┤\u001b[39m\n\u001b[90m│\u001b[39m first product with surge  \u001b[90m│\u001b[39m $10-$20 \u001b[90m│\u001b[39m 19.86 km. \u001b[90m│\u001b[39m 1 hrs. 34 min. 38 sec. \u001b[90m│\u001b[39m 1.23x 😬  \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼─────────┴───────────┴────────────────────────┴──────────┤\u001b[39m\n\u001b[90m│\u001b[39m             📍             \u001b[90m│\u001b[39m jae                                                     \u001b[90m│\u001b[39m\n\u001b[90m├───────────────────────────\u001b[39m\u001b[90m┼─────────────────────────────────────────────────────────┤\u001b[39m\n\u001b[90m│\u001b[39m             🔚             \u001b[90m│\u001b[39m baebae                                                  \u001b[90m│\u001b[39m\n\u001b[90m└───────────────────────────\u001b[39m\u001b[90m┴─────────────────────────────────────────────────────────┘\u001b[39m';
    validateTable(DistanceUnit.KILOMETER);
  });
});
