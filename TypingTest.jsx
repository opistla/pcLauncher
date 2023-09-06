import React, { useEffect, useState, useRef } from 'react';
import { Checkbox, Img } from 'components';
import _ from 'lodash';

import apiChatList from 'service/chatList.json';
const NUM = 54125;

const TestContainer = () => {
  const [list, setList] = useState([]);
  const [text, setText] = useState('');
  const contentRef = useRef();
  const count = useRef(-1);
  const row = useRef(0);
  const isMouseOver = useRef(false);

  useEffect(() => {
    const typingInterval = typing();

    contentRef.current.addEventListener('mouseover', () => {
      isMouseOver.current = false;
    });
    contentRef.current.addEventListener('mouseout', () => {
      isMouseOver.current = true;
    });

    return () => {
      clearInterval(typingInterval);
      contentRef.current.removeEventListener('mouseover', () => {});
      contentRef.current.removeEventListener('mouseout', () => {});
    }
  }, []);

  const typing = () => {
    const filters = _.filter(apiChatList, f => f.extension === NUM);
    return setInterval(() => {
      
      count.current += 1;
      
      setText((prevText) => {
        return prevText + filters[row.current].STT[count.current];
      });

      if (count.current >= filters[row.current].STT.length) {
        count.current = -1;
        row.current += 1;
        setText('');

        if (row.current >= filters.length) {
          row.current = 0;
          setList([]);
        } else {
          setList(_.filter(filters, (f, i) => i < row.current));
        }

        setTimeout(() => {
          if (isMouseOver.current) {
            contentRef.current.scrollTo(0, contentRef.current.scrollHeight);
          };
        }, 0);
      }
    }, 50);
  }

  return (
    <div id='realtime-chat'>
      <header>
        <h1>
          <span>고객명 : <span className="impress">TEST</span></span>
          <span>연령/성별 : <span className="impress">100세 / 남</span></span>
          <span>요금제 : <span className="impress">5GX 프라임</span></span>
          <span>단말기 : <span className="impress">Galaxy Z flip5</span></span>
          <Checkbox
            label='다회선'
            checked
          />
          <Img src='logo-skt.png' alt='sk telecom' />
        </h1>
      </header>
      <main>
        <div className="record-text" ref={contentRef}>
          <div className="allbox">
            {
              _.map(list, (item, i) => (
                <p key={i} className={item.client_yn === 'Y' ? 'user' : 'consultant'}>
                  {item.STT}
                </p>
              ))
            }

            <p className={apiChatList[row.current]?.client_yn === 'Y' ? 'user' : 'consultant'}>
              {text}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TestContainer;
