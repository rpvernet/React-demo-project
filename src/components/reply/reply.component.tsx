import React from 'react';

import {ReplyContainer, ReplyDisplayName, ReplyContent} from './reply.styles'
import {reply} from "../../App"

type ReplyProps = {
    key:string,
    reply: reply
}

const Reply = ({reply}:ReplyProps) =>{

    function timeDifference(current:number, previous:number):string {

        let sPerMinute:number = 60;
        let sPerHour:number = sPerMinute * 60;
        let sPerDay:number = sPerHour * 24;
        let sPerMonth:number = sPerDay * 30;
        let sPerYear:number = sPerDay * 365;

        let elapsed:number = current - previous;

        if (elapsed < sPerMinute) {
            return Math.round(elapsed) + ' seconds ago';
        }

        else if (elapsed < sPerHour) {
            return Math.round(elapsed/sPerMinute) + ' minutes ago';
        }

        else if (elapsed < sPerDay ) {
            return Math.round(elapsed/sPerHour) + ' hours ago';
        }

        else if (elapsed < sPerMonth) {
            return 'approximately ' + Math.round(elapsed/sPerDay) + ' days ago';
        }

        else if (elapsed < sPerYear) {
            return 'approximately ' + Math.round(elapsed/sPerMonth) + ' months ago';
        }

        else {
            return 'approximately ' + Math.round(elapsed/sPerYear) + ' years ago';
        }
    }

    const replyTime:number = Math.floor(reply.createdAt.seconds)
    const currentTime:number = Math.floor(Date.now()/1000)

    const timeElapsed:string = timeDifference(currentTime,replyTime)
    return(
    <ReplyContainer>
        <ReplyDisplayName>{reply.userDisplayName} --- {timeElapsed}</ReplyDisplayName>
        <ReplyContent>{reply.replyContent}</ReplyContent>
    </ReplyContainer>
    )
}

export default Reply;