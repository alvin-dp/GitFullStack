//import { ageClassification } from "./ageClass";
const ageClassification = require('./ageClass');

describe('ageClassification tests', ()=>{
 it('    -1 :', ()=> {
  expect(ageClassification(-1)).toBeNull()   
 })
 it('     0 :', ()=> {
  expect(ageClassification(0)).toBeNull()   
 })
  it('     1 :', ()=> {
  expect(ageClassification(1)).toBe('Дитинство')   
 })
 it('    24 :', ()=> {
  expect(ageClassification(24)).toBe('Дитинство')   
 })
 it(' 24.01 :', ()=> {
  expect(ageClassification(24.01)).toBe('Молодість')   
 })
 it('    44 :', ()=> {
  expect(ageClassification(44)).toBe('Молодість')   
 })    
 it(' 44.01 :', ()=> {
  expect(ageClassification(44.01)).toBe('Зрілість')   
 })   
 it('    65 :', ()=> {
  expect(ageClassification(65)).toBe('Зрілість')   
 })   
 it('  65.1 :', ()=> {
  expect(ageClassification(65.1)).toBe('Старість')   
 })   
 it('    75 :', ()=> {
  expect(ageClassification(75)).toMatch('Старість')   
 })   
 it(' 75.01 :', ()=> {
  expect(ageClassification(75.01)).toBe('Довголіття')   
 })    
 it('    90 :', ()=> {
  expect(ageClassification(90)).toMatch('Довголіття')   
 })    
 it(' 90.01 :', ()=> {
  expect(ageClassification(90.01)).toBe('Рекорд')   
 })  
 it('   122 :', ()=> {
  expect(ageClassification(122)).toMatch('Рекорд')   
 })  
 it('122.01 :', ()=> {
  expect(ageClassification(122.01)).toBeNull()   
 })  
 it('   150 :', ()=> {
  expect(ageClassification(150)).toBeNull()   
 })      
})