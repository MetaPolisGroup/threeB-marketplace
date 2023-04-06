import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { getEllipsisTxt } from 'utils/format';
import styless from './CreatorBox.module.css';

interface CreatorBoxParams {
  name: string | undefined;
  ownerOf: string | undefined;
  address: string | undefined;
}

const CreatorBox = ({ name, ownerOf }: CreatorBoxParams) => {
  return (
    <div className={styless.cardcreatorbox}>
      <div className={styless.content}>
        <div className={styless.viewArea}>
          <Row>
            <Col span={20}></Col>
          </Row>
        </div>

        <div className={styless.wrapperAvatar} style={{ marginTop: '-20px' }}>
          <Row>
            <Col span={12}>
              <div className={styless.inforAvatar} style={{ marginTop: '30px', color: '#000', textAlign: 'left' }}>
                <Avatar src="/img/avatar.png" className={styless.avatar} size={60} />
                <div className={styless.inforAvatarDetail}>
                  <span>Owner by</span>
                  <br />
                  <span>{getEllipsisTxt(ownerOf ? ownerOf : '')}</span>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styless.accountName} style={{}}>
          {name}
        </div>
        <div className={styless.accountTag}>
          <Row>
            <div className={styless.tag}>Collectible</div>
            <div className={styless.tag}>Painting</div>
            <div className={styless.tag}>Print</div>
            <div className={styless.tag}>Image</div>
          </Row>
        </div>
        <div className={styless.description}>
          <div style={{ fontWeight: 'bold' }}>Collection</div>
          <Row>
            <Col span={4}>
              <Avatar src="/img/author-details.png" className={styless.avatarCollection} size={60} />
            </Col>
            <Col span={20}>
              <div className={styless.infoBottom} style={{ marginLeft: '-30px' }}>
                <div className={styless.titleCollection}>1988 Dragon</div>
                <p>1988 Dragon Marketplace</p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default CreatorBox;
