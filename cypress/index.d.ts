/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    getByDataCy(data_cy:string): Chainable<any>;
  }
}