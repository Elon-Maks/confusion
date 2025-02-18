import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { Loading } from './LoadingComponent';
import {baseUrl} from '../shared/baseURL';
import {FadeTransform} from 'react-animation-components';


function RenderCard({item, isLoading, errMess}){
    if (isLoading)
    return(
        <Loading></Loading>
    )
    else if (errMess){
        return(
            <h4>{errMess}</h4>
        )
    }
    else
    return(
        <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
        <Card>
            <CardImg src={baseUrl + item.image} alt={item.name}></CardImg>
            <CardBody>
                <CardTitle>{item.name}</CardTitle>
                {item.designation ? <CardSubtitle>{item.designation}</CardSubtitle>:null}
                <CardText>{item.description}</CardText>
            </CardBody>
        </Card>
        </FadeTransform>
    );
}


function Home(props){
    return(
        <div className="container">
            <div className="row aling-items-start">
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.dish} 
                    isLoading={props.dishesLoading}
                    errMess={props.dishesErrMess}
                    ></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.promotion}
                    isLoading={props.promosLoading}
                    errMess={props.promosErrMess}></RenderCard>
                </div>
                <div className="col-12 col-md m-1">
                    <RenderCard item={props.leader}
                    isLoading={props.leadersLoading}
                    errMess={props.leadersErrMess}></RenderCard>
                </div>
            </div>
        </div>
    )
}


export default Home;