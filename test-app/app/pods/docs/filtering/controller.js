import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import { faker } from '@faker-js/faker';

export default class FilteringController extends Controller {
  @tracked
  numberOfRows = 10;

  get data() {
    return Array.from(Array(this.numberOfRows), () => {
      return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        points: faker.number.int({ min: 0, max: 100 })
      };
    });
  }

  // BEGIN-SNIPPET filtering-custom.js
  @action
  filterPoints(points, { min, max }) {
    min = parseInt(min);
    max = parseInt(max);

    if (
      (isNaN(min) && isNaN(max)) ||
      (isNaN(min) && points <= max) ||
      (min <= points && isNaN(max)) ||
      (min <= points && points <= max)
    ) {
      return true;
    }
    return false;
  }
  // END-SNIPPET
}
