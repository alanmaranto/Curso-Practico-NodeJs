const express = require("express");

const response = require("../../../utils/response");
const auth = require("./secure");
const PostController = require("./index");

const router = express.Router();

//Routes
router.get("/", auth("list"), list);
router.get("/like", auth("list_own"), postsLiked);
router.get("/:id", auth("get"), get);
router.post("/", auth("add"), upsert);
router.put("/", auth("update", { owner: "user" }), upsert);
router.post("/:id/like", auth("add"), like);
router.get("/:id/like", auth("list"), postLikers);

//functions
function list(req, res, next) {
  PostController.list()
    .then(data => {
      response.success(req, res, data, 200);
    })
    .catch(next);
}

function get(req, res, next) {
  PostController.get(req.params.id)
    .then(post => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function upsert(req, res, next) {
  PostController.upsert(req.body, req.user.id)
    .then(post => {
      response.success(req, res, post, 201);
    })
    .catch(next);
}

function like(req, res, next) {
  PostController.like(req.params.id, req.user.sub)
    .then(post => {
      response.success(req, res, post, 201);
    })
    .catch(next);
}

function postLikers(req, res, next) {
  PostController.postLikers(req.params.id)
    .then(post => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

function postsLiked(req, res, next) {
  PostController.postsLiked(req.user.sub)
    .then(post => {
      response.success(req, res, post, 200);
    })
    .catch(next);
}

module.exports = router;
