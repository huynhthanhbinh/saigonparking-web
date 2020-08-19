import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import find from './images/find.png'
import booking from './images/booking.png'
import directionmap from './images/directionmap.png'
import confirm from './images/confirm.png'
import functionimg from './images/function.png'

const TimelineFunction = () => {
    return (
        <VerticalTimeline>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Tìm kiếm xung quanh' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Tìm kiếm hiệu quả</h3>
                <img style={{width:'100%', borderRadius:'10px', marginTop:'10px'}} src={find} alt="search" />
                <p>
                    Tìm kiếm các bãi giữ xe xung quanh nhanh chóng và hiệu quả
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Đặt chỗ' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Đặt chỗ nhanh chóng</h3>
                <img style={{width:'100%', borderRadius:'10px', marginTop:'10px'}} src={booking} alt="search" />
                <p>
                    Đặt chỗ tiện lợi, nhanh chóng, dễ dàng
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Dẫn đường' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Chỉ đường tiện lợi</h3>
                <img style={{width:'100%', borderRadius:'10px', marginTop:'10px'}} src={directionmap} alt="search" />
                <p>
                    Chỉ đường nhanh chóng dễ dàng sử dụng và theo dõi
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Tiện ích' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Tìm kiếm tiện ích nhanh chóng</h3>
                <img style={{width:'100%', borderRadius:'10px', marginTop:'10px'}} src={functionimg} alt="search" />
                <p>
                    Dễ dàng tìm kiếm thêm những tiện ích khác ngoài bãi giữ xe: Nhà hàng, bệnh viện, ...
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                date={ 'Xác nhận' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Xác nhận đến nơi dễ dàng</h3>
                <img style={{width:'100%', borderRadius:'10px', marginTop:'10px'}} src={confirm} alt="search" />
                <p>
                    Xác thực đến nơi dễ dàng bằng cách cho phép nhân viên giữ xe quét mã QR Code
                </p>
            </VerticalTimelineElement>
        </VerticalTimeline>

    )
}

export default TimelineFunction