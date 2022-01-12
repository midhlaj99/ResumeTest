import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Row, Col, Container, Button } from "reactstrap"
import { setResData } from "../../redux/actions/ResumeAction"

function Index() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const ResumeList = useSelector((state) => state.resume_val.ResumeList ? state.resume_val.ResumeList : []);

    const ViewResume = (val,k) => {
        dispatch(setResData('selected_resume', val))
        dispatch(setResData('selected_resume_key', k+1))
        navigate('/manage-resume')
    }
    return (
        <Container>
            <Row>
                <Col xs={12} >
                    <div className='header'>
                        <h2>Resume List</h2>
                        <Button onClick={()=>navigate('/create-resume')}>Create Resume</Button>
                    </div>
                </Col>
                {
                    ResumeList.length > 0 ? ResumeList.map((val, ky) => {
                        return (
                            <div className='resume_list' key={ky} onClick={() => { ViewResume(val,ky) }}>
                                <Col xs={12}>
                                    <span>Name :  {val.name}</span>
                                </Col>
                                <Col xs={12}>
                                    <span>Email :  {val.email}</span>
                                </Col>
                                <Col xs={12}>
                                    <span>Phone :  {val.number}</span>
                                </Col>
                            </div>

                        )
                    })
                        :
                        <Col xs={12}>
                            No Data yet!
                        </Col>
                }
            </Row>
        </Container>
    )
}

export default Index
