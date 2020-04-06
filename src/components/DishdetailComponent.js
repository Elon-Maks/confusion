import React, { Component } from 'react';
import {Card, CardImg,CardText,CardBody,CardTitle, Breadcrumb, BreadcrumbItem, Button,
Modal, ModalBody, ModalHeader, FormGroup, Label, Row, Input,Col} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';


const maxLength = (len) => (val) => !(val) || (val.length<=len)
const minLength = (len) => (val) => (val) && (val.length >=len)

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isFormOpen: false
        }
        this.toggleForm = this.toggleForm.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleForm(){
        this.setState({
            isFormOpen: !this.state.isFormOpen
        });
        
    }

    handleSubmit(values){
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.toggleForm();
    }

    render(){
        return(
            <>
            <Button outline onClick={this.toggleForm}>
                <span className="fa fa-pencil fa-lg"></span> Submit Comment
            </Button>
            <Modal isOpen={this.state.isFormOpen} toggle={this.toggleForm}>  
            <ModalHeader toggle={this.toggleForm}>
                Submit Comment
            </ModalHeader>
            <ModalBody>
                <LocalForm onSubmit={(values) =>this.handleSubmit(values)}>
                <Col md={12}>
                    <Row className="form-group">
                        <Label>Rating</Label>
                        <Control.select model=".rating" name="contactType"
                        className="form-control"
                           >
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                    </Row>
                    <Row className="form-group">
                        <Label>Your Name</Label>
                        <Control.text model=".author" id="name" name="name"
                        placeholder="Your Name"
                        className="form-control"
                        validators={{
                            minLength: minLength(3), maxLength: maxLength (15)
                        }}
                        ></Control.text>
                        <Errors
                        className="text-danger"
                        model=".author"
                        show="touched"
                        messages={{
                            minLength: 'Must be greater than 2 characters',
                            maxLength: 'Must be 15 characters or less'
                        }}>
                        </Errors>
                    </Row>
                    <Row className="form-group">
                        <Label>Comment</Label>
                        <Control.textarea model=".comment" id="message" name="message"
                            rows="12"
                            className="form-control"
                        ></Control.textarea>
                    </Row>
                    <Button type="submit" value="submit" color="primary">Submit</Button>
                </Col>
                </LocalForm>
                
            </ModalBody>
        </Modal>
        </>
        );
    }
}



  function  RenderDish({dish}){
        return(
            <Card>
                <CardImg width="100%" src={dish.image} alt={dish.name}></CardImg>
                <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                    <CardText>{dish.description}</CardText>
                </CardBody>
            </Card>
        )
    }

    function RenderComments({comments, addComment, dishId}){
        if (comments == null)
        return(
            <div>
            </div>
        )
        else
        {
            const commentsList=comments.map((comment)=>{
                return(
                    <li key={comment.id}>
                        <p>{comment.comment}</p>
                        <p>--{comment.author}, {new Intl.DateTimeFormat('en-US',{year: 'numeric',month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                    </li>
                )
            });
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentsList}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment}></CommentForm>
                </div>
            )
        }
    }

    const DishDetail = (props) => {
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading></Loading>
                    </div>
                </div>
            )
        }
        else if (props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            )
        } else
        if (props.dish == null)
        return(
            <div>
            </div>
        )
        else
        return(
            <div className="container">
                 <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to='/menu'>Menu</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr></hr>
                </div>
            </div>
            <div className="row"> 
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dish}></RenderDish>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments} 
                     addComment={props.addComment}
                     dishId={props.dish.id}></RenderComments>
                </div>
            </div>
            </div>
        );
    }

export default DishDetail;
