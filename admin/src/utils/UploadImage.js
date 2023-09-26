/* eslint-disable react-hooks/exhaustive-deps */
import { Upload, Button } from "antd";
import ImgCrop from 'antd-img-crop';
import fileService from "../services/file";
import React from "react";
import { UploadOutlined } from '@ant-design/icons';

export default function UploadImage({ fileList, setFileList, count = 1, cropImage = null, disabled = false, listType = "picture-card" }) {
    const uploadImage = async options => {
        const { onSuccess, onError, file, onProgress } = options;

        const fmData = new FormData();
        const config = { onUploadProgress: event => { onProgress({ percent: (event.loaded / event.total) * 100 }); } };
        fmData.append("file", file);
        try {
            fileService.save(fmData, config).then(res => {
                onSuccess("Ok");
                setFileList([...fileList, { uid: res.data.uid, url: res.data.url, name: res.data.name }]);
            })
        } catch (err) {
            onError({ err });
        }
    };

    const handleOnChange = ({ file, fl }) => {
        if (typeof fl !== typeof []) {
            fl = [];
        }
        setFileList(fl);

    };
    const handleRemove = (file) => {
        fileService.remove({ uid: file.uid }).then(res => {
            setFileList(fileList.filter(v => v.uid !== file.uid));
        })
    };

    if (cropImage) {
        if (typeof cropImage !== typeof {}) {
            cropImage = {};
        }
        cropImage.aspect = cropImage.aspect || 1;
        cropImage.shape = cropImage.shape || 'rect';
        cropImage.quality = cropImage.quality || 1;
        return (
            <ImgCrop rotate aspect shape={cropImage.shape} quality={cropImage.quality} >
                <Upload
                    accept="image/*"
                    customRequest={uploadImage}
                    onChange={handleOnChange}
                    onRemove={handleRemove}
                    listType={listType}
                    fileList={fileList}
                    className="image-upload-grid"
                    disabled={disabled}
                >
                    {
                        fileList?.length >= count
                            ? null
                            : listType === 'picture'
                                ? <Button icon={<UploadOutlined />} type="dashed" >Upload</Button>
                                : <div>Upload</div>
                    }
                </Upload>
            </ImgCrop>
        );
    } else {
        return <Upload
            accept="image/*"
            customRequest={uploadImage}
            onChange={handleOnChange}
            onRemove={handleRemove}
            listType={listType}
            fileList={fileList}
            className="image-upload-grid"
            disabled={disabled}
        >
            {
                fileList?.length >= count
                    ? null
                    : listType === 'picture'
                        ? <Button icon={<UploadOutlined />} type="dashed" >Upload</Button>
                        : <div>Upload</div>
            }
        </Upload>
    }

};