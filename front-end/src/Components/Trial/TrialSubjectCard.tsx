import React,{FC} from 'react';

interface ParentProps {
    _id:string;
    name:string;
    isSelect?:boolean;
    onSelect:(id:string)=>void
}
const TrialSubjectCard : FC<ParentProps>  = ({_id, name ,isSelect ,onSelect}) => {
  return (
    <div
      className="subjectSelect__item"
      style={{backgroundColor: isSelect? '#6ccad3':'#191919',}}
      onClick={()=>onSelect(_id)}
    >
      {name}
    </div>
  );
};
export default TrialSubjectCard;
