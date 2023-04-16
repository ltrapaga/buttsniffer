import React, { useContext } from "react";
import { AuthContext } from "../context/auth";
import { useNavigate, useParams } from "react-router-dom";
import gql from "graphql-tag";
import { useQuery } from "@apollo/client";
import { formatDistanceToNow } from "date-fns";
import {
  Button,
  Card,
  // Form,
  Grid,
  Image,
  Icon,
  Label,
  Popup 
} from "semantic-ui-react";

import AddComment from '../components/AddComment';
import DeleteButton from "../components/DeleteButton";
import myImage from "../images/dogprofilepic.png";

export default function SinglePost() {
  // Extracting postId from props and assigning it to postId variable
  const { postId } = useParams() || "";
  // Extracting user from AuthContext using the useContext hook
  const { user } = useContext(AuthContext);

  // Executing the useQuery hook to get a single post
  const { loading, data } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });
  const navigate = useNavigate();
  // Callback function to be called when a post is deleted
  function deletePostCallback() {
    // Navigating to the home page after deleting the post
    navigate("/");
  }

  const post = data?.getSinglePost || {};

  const singlePost = loading ? (
    <h5>Loading post...</h5>
  ) : (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image size="small" float="right" src={myImage} />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{post.username}</Card.Header>
              <Card.Meta>
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </Card.Meta>
              <Card.Description>{post.body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              {/* <Like user={user} post={{ id, likeCount, likes }} /> */}
              <Popup
                content='Add comment'
                pinned
                trigger={<Button
                  as="div"
                  labelPosition="right"
                  onClick={() => {console.log("Comment on post")}}
                >
                  <Button basic color="blue">
                    <Icon name="comments" />
                  </Button>
                  <Label basic color="blue" pointing="left">
                    {post.commentCount}
                  </Label>
                </Button>}
              />
              {user && user.username === post.username && (
                <DeleteButton postId={post.id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
          {user && (
              <AddComment postId={ postId }></AddComment>
            )}
          {/* {comments.map((comment) => (
              <Card fluid key={comment.id}>
                <Card.Content>
                  {user && user.username === comment.username && (
                    <DeleteButton postId={id} commentId={comment.id} />
                  )}
                  <Card.Header>{comment.username}</Card.Header>
                  <Card.Meta>{formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</Card.Meta>
                  <Card.Description>{comment.body}</Card.Description>
                </Card.Content>
              </Card>
            ))} */}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
  return singlePost;
}

const FETCH_POST_QUERY = gql`
  query ($postId: ID!) {
    getSinglePost(postId: $postId) {
      id
      body
      createdAt
      username
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        id
        username
        createdAt
        body
      }
    }
  }
`;
