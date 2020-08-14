import React from "react";

const TagsInput = ({ addTags, removeTags, tags }) => {
  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} id="tag">
            <span className="tag-title">{tag}</span>
            <i className="tag-close-icon" onClick={() => removeTags(index)}>
              X
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
