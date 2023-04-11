import React from 'react';

import Image from 'next/image';
import { Form, Input } from 'antd';
import classes from './profileForm.module.css';
import { ClusterOutlined } from '@ant-design/icons';

import DEFAULT_AVATER from '../../../../public/img/profile&cover-01.png';

interface TForm {
  referral: string | undefined;
  name: string | undefined;
  email: string | undefined;
  phone: string | undefined;
  bio: string | undefined;
}

const ProfileForm: React.FC = () => {
  const onSubmit = (values: TForm) => {
    console.log('Dataform:', values);
  };

  return (
    <div className={classes.profile}>
      <Form name="profile" onFinish={onSubmit}>
        <div className={classes.boxAvatar}>
          <Image src={DEFAULT_AVATER} alt="" width={60} height={60} />
          <div>
            <button>Upload Avatar</button>
            <button>Upload Background</button>
          </div>
        </div>
        <div className={classes.formContent}>
          <h4>Your Information</h4>
          <Form.Item name="referral">
            <div className={classes.boxForm}>
              <label>Referral</label>
              <Input className={classes.ipReferral} placeholder="Enter your referral" />
              <button className={classes.btnIcon}>
                <ClusterOutlined />
              </button>
            </div>
          </Form.Item>
          <Form.Item>
            <div className={classes.boxForm}>
              <label>Rewards</label>
              <div>
                0 BNB{' '}
                <button>
                  <ClusterOutlined /> Claim
                </button>
              </div>
            </div>
          </Form.Item>
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
            <button className={classes.btnSubmit}>Update</button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default ProfileForm;
