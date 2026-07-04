use hyper::service::{make_service_fn, service_fn};
use hyper::{Body, Request, Response, Server};
use std::convert::Infallible;
use std::net::SocketAddr;

async fn relay(req: Request<Body>) -> Result<Response<Body>, Infallible> {
    let body = hyper::body::to_bytes(req.into_body()).await.unwrap_or_default();
    Ok(Response::new(Body::from(body)))
}

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([127, 0, 0, 1], 8088));
    let make_svc = make_service_fn(|_conn| async { Ok::<_, Infallible>(service_fn(relay)) });
    let server = Server::bind(&addr).serve(make_svc);
    if let Err(e) = server.await {
        eprintln!("server error: {e}");
    }
}
