//import { ageClassification } from "./ageClass";
const weekFn = require('./weekDay');

describe('weekDay tests', ()=>{
 it('    1 :', ()=> {
  expect(weekFn(1)).toMatch('Понеділок')   
 })
 it('    3 :', ()=> {
  expect(weekFn(3)).toMatch('Середа')   
 })
 it('    7 :', ()=> {
  expect(weekFn(7)).toMatch('Неділя')   
 })
 it('    9 :', ()=> {
  expect(weekFn(9)).toBeNull()   
 })
 it('  1.5 :', ()=> {
  expect(weekFn(1.5)).toBeNull()   
 })
 it('  "2" :', ()=> {
  expect(weekFn("2")).toBeNull()  
 }) 
})