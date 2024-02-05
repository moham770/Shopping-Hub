import { Button, IconButton } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

const PaginationComp = ({ totalPage, currentPage, onPageChange }) => {
  const next = () => {
    if (currentPage < totalPage) {
      onPageChange(currentPage + 1);
    }
  };

  const prev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    for (let i = 1; i <= totalPage; i++) {
      buttons.push(
        <IconButton
          key={i}
          variant={currentPage === i ? "filled" : "text"}
          color="gray"
          onClick={() => onPageChange(i)}
        >
          {i}
        </IconButton>
      );
    }
    return buttons;
  };

  return (
    <div className="flex items-center justify-center gap-4 my-10 ml-auto">
      <Button
        variant="text"
        className="flex items-center gap-2 "
        onClick={prev}
        disabled={currentPage === 1}
      >
        <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" /> Previous
      </Button>
      <div className="flex items-center gap-2">{renderPaginationButtons()}</div>
      <Button
        variant="text"
        className="flex items-center gap-2"
        onClick={next}
        disabled={currentPage === totalPage}
      >
        Next
        <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default PaginationComp;
