import React from 'react';
import { useEffect, useState } from 'react';
import { createNewBlogrService, getDetailBlogByIdService, updateBlogService } from '../../../services/userService';
import CommonUtils from '../../../utils/CommonUtils';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment';
import { useFetchAllCode } from '../../customize/fetch';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
const AddBlog = (props) => {
    const mdParser = new MarkdownIt();
    const { id } = useParams();
    const { data: dataSubject } = useFetchAllCode('SUBJECT')
    const [inputValues, setInputValues] = useState({
        title: '', shortDescription: '', image: '', isActionADD: true, imageReview: '', isOpen: false, contentMarkdown: '',
        contentHTML: '', subjectId: ''
    });
    if (dataSubject && dataSubject.length > 0 && inputValues.subjectId === '') {

        setInputValues({ ...inputValues, ["subjectId"]: dataSubject[0].code })
    }
    useEffect(() => {
        if (id) {
            let fetchBlog = async () => {
                let res = await getDetailBlogByIdService(id)
                if (res && res.errCode === 0) {
                    setStateBlog(res.data)
                }
            }
            fetchBlog();
        }

    }, [])
    let setStateBlog = (data) => {
        setInputValues({
            ...inputValues,
            ["title"]: data.title,
            ["shortDescription"]: data.shortDescription,
            ["image"]: data.image,
            ["imageReview"]: data.image,
            ["isActionADD"]: false,
            ["contentMarkdown"]: data.contentMarkdown,
            ["contentHTML"]: data.contentHTML,
            ["subjectId"]: data.subjectId,
        })

    }
    const handleOnChange = event => {
        const { name, value } = event.target;
        setInputValues({ ...inputValues, [name]: value });

    };
    let handleOnChangeImage = async (event) => {
        let data = event.target.files;
        let file = data[0];
        if(file.size > 31312281){
            toast.error("Smaller file size 30mb")
        }
        else{
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file)
            setInputValues({ ...inputValues, ["image"]: base64, ["imageReview"]: objectUrl })

        }
    }
    let openPreviewImage = () => {
        if (!inputValues.imageReview) return;

        setInputValues({ ...inputValues, ["isOpen"]: true })
    }
    let handleSaveBlog = async () => {
        if (inputValues.isActionADD === true) {
            let res = await createNewBlogrService({
                shortDescription: inputValues.shortDescription,
                title: inputValues.title,
                subjectId: inputValues.subjectId,
                image: inputValues.image,
                contentMarkdown: inputValues.contentMarkdown,
                contentHTML: inputValues.contentHTML,
                userId: JSON.parse(localStorage.getItem('userData')).id
            })
            if (res && res.errCode === 0) {
                toast.success("New post created successfully !")
                setInputValues({
                    ...inputValues,
                    ["shortDescription"]: '',
                    ["title"]: '',
                    ["subjectId"]: '',
                    ["image"]: '',
                    ["contentMarkdown"]: '',
                    ["contentHTML"]: '',
                    ["imageReview"]: ''
                })
            } else toast.error("Creating new post failed")
        } else {
            let res = await updateBlogService({
                shortDescription: inputValues.shortDescription,
                title: inputValues.title,
                subjectId: inputValues.subjectId,
                image: inputValues.image,
                contentMarkdown: inputValues.contentMarkdown,
                contentHTML: inputValues.contentHTML,
                id: id
            })
            if (res && res.errCode === 0) {
                toast.success("Post updated successfully !")

            } else toast.error("Post update failed")
        }
    }
    let handleEditorChange = ({ html, text }) => {
        setInputValues({
            ...inputValues,
            ["contentMarkdown"]: text,
            ["contentHTML"]: html
        })
    }
    return (
        <div className="container-fluid px-4">
            <h1 className="mt-4">Quản lý bài đăng</h1>


            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1" />
                    {inputValues.isActionADD === true ? 'Create new post' : 'Update post information'}
                </div>
                <div className="card-body">
                    <form>
                        <div className="form-row">
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Post name</label>
                                <input type="text" value={inputValues.title} name="title" onChange={(event) => handleOnChange(event)} className="form-control" id="inputEmail4" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Topic</label>
                                <select value={inputValues.subjectId} name="subjectId" onChange={(event) => handleOnChange(event)} id="inputState" className="form-control">
                                    {dataSubject && dataSubject.length > 0 &&
                                        dataSubject.map((item, index) => {
                                            return (
                                                <option key={index} value={item.code}>{item.value}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="col-md-3 form-group">
                                <label>Select image</label>
                                <input accept=".jpg,.png" onChange={(event) => handleOnChangeImage(event)} type="file" className="form-control form-file" />
                            </div>
                            <div className="form-group col-md-3">
                                <label htmlFor="inputEmail4">Image displayed</label>
                                <div style={{ backgroundImage: `url(${inputValues.imageReview})` }} onClick={() => openPreviewImage()} className="box-img-preview"></div>
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress">Short description</label>
                                <textarea rows="4" value={inputValues.shortDescription} name="shortDescription" onChange={(event) => handleOnChange(event)} className="form-control"></textarea>
                            </div>
                            <div className="form-group col-md-12">
                                <label htmlFor="inputAddress">Post content</label>
                                <MdEditor
                                    style={{ height: '500px' }}
                                    renderHTML={text => mdParser.render(text)}
                                    onChange={handleEditorChange}
                                    value={inputValues.contentMarkdown}
                                />
                            </div>
                        </div>
                        <button onClick={() => handleSaveBlog()} type="button" className="btn btn-primary">Save</button>
                    </form>
                </div>
            </div>
            {inputValues.isOpen === true &&
                <Lightbox mainSrc={inputValues.imageReview}
                    onCloseRequest={() => setInputValues({ ...inputValues, ["isOpen"]: false })}
                />
            }
        </div>
    )
}
export default AddBlog;