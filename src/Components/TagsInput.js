import React from "react";

const TagsInput = ({ addTags, removeTags, tags }) => {
  return (
    <div>
      <ul>
        {tags.map((tag, index) => (
          <li key={index}>
            <span>{tag}</span>
            <i className="material-icons" onClick={() => removeTags(index)}>
              close
            </i>
          </li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Press enter to add tags"
        onKeyUp={(e) => addTags(e)}
      />
    </div>
  );
};

export default TagsInput;
