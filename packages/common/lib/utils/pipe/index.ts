/**
 * There is no way to accommodate type inference for N transformations
 * if transformative steps create non deterministic outputs before arriving
 * at a final output type of type <Output>.
 *
 * So the contract with pipeline therein,
 * is as long as the initial value supplied is of type <Input>,
 * and the final value returned is of type <Output>,
 * the intermediate values can be of any type.
 */
function pipeline<Input, Output>(...fns: ((input: any) => any)[]) {
  return (input: Input): Output => {
    return fns.reduce((acc, fn) => fn(acc), input) as unknown as Output;
  };
}
export { pipeline };
