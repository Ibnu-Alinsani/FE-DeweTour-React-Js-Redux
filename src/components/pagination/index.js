const Pagination = ({
  totalposts,
  postsperpage,
  setcurrentpage,
  currentpage,
}) => {
  let pages = [];

  for (let i = 1; i <= Math.ceil(totalposts / postsperpage); i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            onClick={() => {
              setcurrentpage(page);
              window.scrollTo(0, 0);
            }}
            className={page == currentpage ? "active" : ""}
          >
            {page}
          </button>
        );
      })}
    </div>
  );
};

export default Pagination;
