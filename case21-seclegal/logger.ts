export function auditPayment(user: { email: string; card: string; ssn: string }) {
  console.log(`Payment by ${user.email}, card ${user.card}, ssn ${user.ssn} succeeded`);
}
