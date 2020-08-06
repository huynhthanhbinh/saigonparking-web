import React from 'react'
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';


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
                <h4 className="vertical-timeline-element-subtitle">Miami, FL</h4>
                <p>
                    Creative Direction, User Experience, Visual Design, Project Management, Team Leading
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Dẫn đường' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Chỉ đường tiện lợi</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    Creative Direction, User Experience, Visual Design, SEO, Online Marketing
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Thời gian thực' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Cập nhật số lượng chỗ theo thời gian thực</h3>
                <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
                <p>
                    User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--work"
                iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                date={ 'Đặt chỗ' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Đặt chỗ nhanh chóng</h3>
                <h4 className="vertical-timeline-element-subtitle">San Francisco, CA</h4>
                <p>
                    User Experience, Visual Design
                </p>
            </VerticalTimelineElement>
            <VerticalTimelineElement
                className="vertical-timeline-element--education"
                iconStyle={{ background: 'rgb(233, 30, 99)', color: '#fff' }}
                date={ 'Xác nhận' }
                dateClassName={'title-function'}
            >
                <h3 className="vertical-timeline-element-title">Xác nhận đến nơi dễ dàng</h3>
                <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
                <p>
                    Strategy, Social Media
                </p>
            </VerticalTimelineElement>
        </VerticalTimeline>

    )
}

export default TimelineFunction