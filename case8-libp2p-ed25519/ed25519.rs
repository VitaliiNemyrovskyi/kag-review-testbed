use ed25519_dalek as ed25519;
use failure::Fail;
use super::error::DecodingError;
use zeroize::Zeroize;
pub struct Keypair(ed25519::Keypair);
impl Keypair {
    pub fn generate() -> Keypair {
        Keypair(ed25519::Keypair::generate(&mut rand::thread_rng()))
    }
    pub fn encode(&self) -> [u8; 64] {
        self.0.to_bytes()
    }
    pub fn decode(kp: &mut [u8]) -> Result<Keypair, DecodingError> {
        ed25519::Keypair::from_bytes(kp)
            .map(|k| {
                kp.zeroize();
                Keypair(k)
            })
            .map_err(|e| DecodingError::new("Ed25519 keypair").source(e.compat()))
    }
    pub fn sign(&self, msg: &[u8]) -> Vec<u8> {
        self.0.sign(msg).to_bytes().to_vec()
    }
    pub fn public(&self) -> PublicKey {
        PublicKey(self.0.public)
    }
    pub fn secret(&self) -> SecretKey {
        SecretKey::from_bytes(&mut self.0.secret.to_bytes())
            .expect("ed25519::SecretKey::from_bytes(to_bytes(k)) != k")
    }
}
impl Clone for Keypair {
    fn clone(&self) -> Keypair {
        let mut sk_bytes = self.0.secret.to_bytes();
        let secret = SecretKey::from_bytes(&mut sk_bytes)
            .expect("ed25519::SecretKey::from_bytes(to_bytes(k)) != k")
            .0;
        let public = ed25519::PublicKey::from_bytes(&self.0.public.to_bytes())
            .expect("ed25519::PublicKey::from_bytes(to_bytes(k)) != k");
        Keypair(ed25519::Keypair { secret, public })
    }
}
impl From<Keypair> for SecretKey {
    fn from(kp: Keypair) -> SecretKey {
        SecretKey(kp.0.secret)
    }
}
impl From<SecretKey> for Keypair {
    fn from(sk: SecretKey) -> Keypair {
        let secret = sk.0;
        let public = ed25519::PublicKey::from(&secret);
        Keypair(ed25519::Keypair { secret, public })
    }
}
#[derive(PartialEq, Eq, Debug, Clone)]
pub struct PublicKey(ed25519::PublicKey);
impl PublicKey {
    pub fn verify(&self, msg: &[u8], sig: &[u8]) -> bool {
        ed25519::Signature::from_bytes(sig).map(|s| self.0.verify(msg, &s)).is_ok()
    }
    pub fn encode(&self) -> [u8; 32] {
        self.0.to_bytes()
    }
    pub fn decode(k: &[u8]) -> Result<PublicKey, DecodingError> {
        ed25519::PublicKey::from_bytes(k)
            .map_err(|e| DecodingError::new("Ed25519 public key").source(e.compat()))
            .map(PublicKey)
    }
}
pub struct SecretKey(ed25519::SecretKey);
impl AsRef<[u8]> for SecretKey {
    fn as_ref(&self) -> &[u8] {
        self.0.as_bytes()
    }
}
impl Clone for SecretKey {
    fn clone(&self) -> SecretKey {
        let mut sk_bytes = self.0.to_bytes();
        Self::from_bytes(&mut sk_bytes)
            .expect("ed25519::SecretKey::from_bytes(to_bytes(k)) != k")
    }
}
impl SecretKey {
    pub fn generate() -> SecretKey {
        SecretKey(ed25519::SecretKey::generate(&mut rand::thread_rng()))
    }
    pub fn from_bytes(
        mut sk_bytes: impl AsMut<[u8]>,
    ) -> Result<SecretKey, DecodingError> {
        let sk_bytes = sk_bytes.as_mut();
        let secret = ed25519::SecretKey::from_bytes(&*sk_bytes)
            .map_err(|e| DecodingError::new("Ed25519 secret key").source(e.compat()))?;
        sk_bytes.zeroize();
        Ok(SecretKey(secret))
    }
}
#[cfg(test)]
mod tests {
    use super::*;
    use quickcheck::*;
    fn eq_keypairs(kp1: &Keypair, kp2: &Keypair) -> bool {
        kp1.public() == kp2.public()
            && kp1.0.secret.as_bytes() == kp2.0.secret.as_bytes()
    }
    #[test]
    fn ed25519_keypair_encode_decode() {
        fn prop() -> bool {
            let kp1 = Keypair::generate();
            let mut kp1_enc = kp1.encode();
            let kp2 = Keypair::decode(&mut kp1_enc).unwrap();
            eq_keypairs(&kp1, &kp2) && kp1_enc.iter().all(|b| *b == 0)
        }
        QuickCheck::new().tests(10).quickcheck(prop as fn() -> _);
    }
    #[test]
    fn ed25519_keypair_from_secret() {
        fn prop() -> bool {
            let kp1 = Keypair::generate();
            let mut sk = kp1.0.secret.to_bytes();
            let kp2 = Keypair::from(SecretKey::from_bytes(&mut sk).unwrap());
            eq_keypairs(&kp1, &kp2) && sk == [0u8; 32]
        }
        QuickCheck::new().tests(10).quickcheck(prop as fn() -> _);
    }
    #[test]
    fn ed25519_signature() {
        let kp = Keypair::generate();
        let pk = kp.public();
        let msg = "hello world".as_bytes();
        let sig = kp.sign(msg);
        assert!(pk.verify(msg, & sig));
        let mut invalid_sig = sig.clone();
        invalid_sig[3..6].copy_from_slice(&[10, 23, 42]);
        assert!(! pk.verify(msg, & invalid_sig));
        let invalid_msg = "h3ll0 w0rld".as_bytes();
        assert!(! pk.verify(invalid_msg, & sig));
    }
}