import React, { useEffect, useState } from 'react'
import { Row, Col, Card, CardHeader, CardBody, Container, Input, Label, Button, CardFooter, FormFeedback } from "reactstrap"
import { useDispatch, useSelector } from "react-redux";
import { setResData } from "../../redux/actions/ResumeAction"
import "./style.css"
import Select from 'react-select'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


function CreateResume() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [input_data, setInputData] = useState({
        name: '',
        email: '',
        number: '',
        address: ''
    })
    const [err, setErr] = useState({})
    const [skills_arr, setSkills] = useState([])
    const EducationList = useSelector((state) => state.resume_val.EducationList ? state.resume_val.EducationList : []);
    const ResumeList = useSelector((state) => state.resume_val.ResumeList ? state.resume_val.ResumeList : []);
    const SelectedResume = useSelector((state) => state.resume_val.selected_resume ? state.resume_val.selected_resume : false);
    const SelectedResumeKey = useSelector((state) => state.resume_val.selected_resume_key ? state.resume_val.selected_resume_key : '');



    useEffect(() => {
        if (SelectedResume) {
            const { education, skills, name, email, number, address } = SelectedResume
            dispatch(setResData('EducationList', education))
            setSkills(skills)
            setInputData({
                name: name,
                email: email,
                number: number,
                address: address
            })
        } else {
            let education = []
            let data = {}
            data.institute = ''
            data.year = ''
            data.degree = ''
            education.push(data)
            dispatch(setResData('EducationList', education))
        }


        return () => {
            dispatch(setResData('SelectedResume', ''))
            dispatch(setResData('selected_resume_key', ''))
        }
    }, [])


    const handleChangeEducation = (e, i) => {

        let { name, value } = e.target;
        let blist = [...EducationList]
        if (name === "institute") {
            blist[i].institute = value
            dispatch(setResData('EducationList', blist))
        }
        else if (name === 'year') {
            blist[i].year = value
            dispatch(setResData('EducationList', blist))
        } else {
            blist[i].degree = value
            dispatch(setResData('EducationList', blist))
        }
    }


    const Addone = () => {
        let list = [...EducationList]
        let data = {}
        data.institute = ''
        data.year = ''
        data.degree = ''
        list.push(data)
        dispatch(setResData('EducationList', list))

    }

    const Removeone = (i) => {
        let blist = [...EducationList]
        blist.splice(i, 1)
        dispatch(setResData('EducationList', blist))

    }

    const HandleChange = (e) => {
        let { name, value } = e.target;
        setInputData({ ...input_data, [name]: value })
    }

    const handleChangeSkill = (opt) => {
        setSkills(opt)
    }

    const Validate = (val) => {
        if (!val) return "Required"
    }
    const Submit = () => {

        let err = {
            name: Validate(input_data.name),
            email: Validate(input_data.email),
            number: Validate(input_data.number),
            address: Validate(input_data.address),
            institute: EducationList.some((val) => val.institute === ''),
            year: EducationList.some((val) => val.year === ''),
            degree: EducationList.some((val) => val.degree === ''),
        }

        if (
            !err.name &&
            !err.email &&
            !err.number &&
            !err.address &&
            !err.institute &&
            !err.year &&
            !err.degree
        ) {
            setErr(err)
            let resume = [...ResumeList]
            let data = { ...input_data, education: EducationList, skills: skills_arr }
            if (SelectedResume) {
                resume[SelectedResumeKey-1] = data
            }
            else {
                resume.push(data)
            }
            dispatch(setResData('ResumeList', resume))
            Swal.fire({
                icon: "success",
                title: "",
                text: SelectedResume ? "Resume Updated Successfully" : "Resume Created Successfully",
            }).then(() => {
                navigate("/");
            })
        } else {
            console.log(err, EducationList)
            setErr(err)
        }
    }


    return (
        <Container style={{ marginTop: '10px' }}>
            <Card>
                <CardHeader>{SelectedResume ? "Update Resume" : "Create Resume"}</CardHeader>
                <CardBody>
                    <Row>
                        <Col xs={12} sm={6}>
                            <Label>Name</Label>
                            <Input type='text' invalid={err.name} name='name' onChange={HandleChange} value={input_data.name} />
                            <FormFeedback>{err.name}</FormFeedback>
                        </Col>
                        <Col xs={12} sm={6}>
                            <Label>Email</Label>
                            <Input type='email' name='email' invalid={err.email} onChange={HandleChange} value={input_data.email} />
                            <FormFeedback>{err.email}</FormFeedback>

                        </Col>
                        <Col xs={12} sm={6}>
                            <Label>Phone</Label>
                            <Input type='number' name='number' invalid={err.number} onChange={HandleChange} value={input_data.number} />
                            <FormFeedback>{err.number}</FormFeedback>

                        </Col>
                        <Col xs={12} sm={6}>
                            <Label>Address</Label>
                            <Input type='textarea' raws={4} name='address' invalid={err.address} onChange={HandleChange} value={input_data.address} />
                            <FormFeedback>{err.address}</FormFeedback>

                        </Col>

                        <Col xs={12}>
                            <Label>Skill</Label>
                            <Select isMulti options={options} value={skills_arr} onChange={handleChangeSkill} />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '10px' }}>
                        <Col xs={12}>
                            <span>Education</span>
                        </Col>
                        {
                            EducationList.map((val, ky) => {
                                return (
                                    <Row style={{ marginTop: '3px' }} key={ky}>
                                        <Col xs={6} sm={4}>
                                            <span className="text-danger">*</span>Institute
                                            {ky === 0 && err.institute && <span className="text-danger">Fill All</span>}

                                            <Input type='text' name='institute' autocomplete="off" onChange={(e) => { handleChangeEducation(e, ky) }} value={val.institute ? val.institute : ''}></Input>
                                        </Col>
                                        <Col xs={6} sm={3}>
                                            <span className="text-danger">*</span>Year
                                            {ky === 0 && err.year && <span className="text-danger">Fill All</span>}

                                            <Input onChange={(e) => { handleChangeEducation(e, ky) }} value={val.year ? val.year : ''} name='year' type='number'></Input>
                                        </Col>
                                        <Col xs={6} sm={3}>
                                            <span className="text-danger">*</span> Degree
                                            {ky === 0 && err.degree && <span className="text-danger">Fill All</span>}

                                            <Input onChange={(e) => { handleChangeEducation(e, ky) }} value={val.degree ? val.degree : ''} name='degree' type='text'></Input>
                                        </Col>

                                        {
                                            ky === 0 ?
                                                <Col xs={6} sm={1} style={{ textAlign: 'right', paddingTop: '20px' }}>
                                                    <Button onClick={() => { Addone(ky) }} size='xs' color='danger'>
                                                        Add
                                                    </Button>
                                                </Col>
                                                :
                                                <Col xs={6} sm={1} style={{ textAlign: 'right', paddingTop: '20px' }}>
                                                    <Button onClick={() => { Removeone(ky) }} size='xs' color='danger'>
                                                        delete
                                                    </Button>
                                                </Col>


                                        }

                                    </Row>

                                )
                            })
                        }

                    </Row>
                </CardBody>

                <CardFooter>
                    <Button onClick={Submit}>{SelectedResume ? "Update" : "Submit"}</Button>
                </CardFooter>
            </Card>
        </Container>

    )
}

export default CreateResume
