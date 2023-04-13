import React, { useState } from 'react';

import Image from 'next/image';
import { Form, Input, Upload } from 'antd';
import classes from './profileForm.module.css';

import DEFAULT_AVATER from '../../../../public/img/profile&cover-01.png';

interface TForm {
  referral: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  bio: string | undefined;
}

const ProfileForm: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [imagesImport, setImagesImport] = useState();

  const onSubmit = (values: TForm) => {
    console.log('Dataform:', values);
  };

  const handleUploadFile = (file: any) => {
    console.log({ file });
    setImagesImport(file?.file?.name);
  };

  return (
    <div className={classes.profile}>
      <Form name="profile" onFinish={onSubmit}>
        <div className={classes.boxAvatar}>
          <Image src={DEFAULT_AVATER} alt="" width={60} height={60} />
          <div>
            <Upload showUploadList={false} onChange={handleUploadFile}>
              <button type="button">Upload Avatar</button>
            </Upload>
            <button type="button">Upload Background</button>
          </div>
        </div>
        <div className={classes.formContent}>
          <h4>Your Information</h4>
          <Form.Item name="name" rules={[{ required: true, message: 'Please input your username!' }]}>
            <div className={classes.boxForm}>
              <label>Name *</label>
              <Input placeholder="Enter your name" />
            </div>
          </Form.Item>
          <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
            <div className={classes.boxForm}>
              <label>Email *</label>
              <Input placeholder="Enter your mail" />
            </div>
          </Form.Item>
          <Form.Item name="phone" rules={[{ required: true, message: 'Please input your phone!' }]}>
            <div className={classes.boxForm}>
              <label>Phone *</label>
              <Input placeholder="Enter your number" />
            </div>
          </Form.Item>
          <Form.Item name="bio">
            <div className={classes.boxForm}>
              <label>Bio</label>
              <Input.TextArea placeholder="Enter your bio" />
            </div>
          </Form.Item>
          <Form.Item>
            <button className={classes.btnSubmit} type="submit">
              Update
            </button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
