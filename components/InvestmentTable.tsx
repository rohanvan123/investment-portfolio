import React, { FormEvent, useState } from "react";
import {
  usePortfolioData,
  useShareData,
  useTickerList,
} from "@/hooks/portfolios";
import Downarrow from "./Icons/Downarrow";
import { postData } from "@/hooks/user";

/** Sends a PUT request to the courses-data endpoint
 * @param courseName, the course name inputted by the user
 * @param courseTeacher, the teacher selected by the user
 * @param id, the id of the data entry
 */
// const updateCourseData = async (
//   courseName: string,
//   courseTeacher: string,
//   id: number
// ) => {
//   const response = await fetch("http://localhost:3001/course-data/" + id, {
//     method: "PUT",
//     body: JSON.stringify({
//       name: courseName,
//       teacher: courseTeacher,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   const data = await response.json();
//   console.log(data);
// };

const InvestmentTable = () => {
  const { portfolioData } = usePortfolioData();
  const { userShares } = useShareData();
  const { tickerList } = useTickerList();

  //   const [displayModal, setDisplayModal] = useState(false);
  //   const [selectedTeacher, setSelectedTeacher] = useState("");
  //   const [selectedName, setSelectedName] = useState("");
  //   const [currentID, setCurrentID] = useState(0);

  //   const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
  //     console.log("clicked");
  //     event.preventDefault();
  //     updateCourseData(selectedName, selectedTeacher, currentID);
  //     window.location.reload();
  //   };

  return (
    <div className="border rounded-[10px] overflow-hidden overlay">
      {/* {displayModal && (
        <div className="z-10 flex justify-center bg-black">
          <div className="w-[400px] h-[320px] fixed bg-white border-black border-[.5px] rounded-[8px] mt-[50px]">
            <div className="text-[18px] font-semibold font-inter mt-[20px] ml-[20px]">
              Change Some Information
            </div>
            <form
              className="mt-[20px] ml-[20px] w-[360px]"
              onSubmit={handleFormSubmit}
            >
              <div>
                <label
                  className="text-[14px] text-[#344054] font-inter"
                  htmlFor="name"
                >
                  Course Name:
                </label>
                <br></br>
                <input
                  className="w-[297px] h-[40px] mb-[10px] rounded-[8px] border-black border-[.5px]"
                  type="text"
                  value={selectedName}
                  onChange={(e) => {
                    setSelectedName(e.target.value);
                  }}
                  required
                ></input>
                <br></br>
                <label className="text-[14px] text-[#344054]" htmlFor="teacher">
                  Teacher:
                </label>
                <br></br>
                <select
                  className="w-[297px] h-[40px] mb-[10px] rounded-[8px] border-black border-[.5px]"
                  value={selectedTeacher}
                  id="teacher"
                  required
                  onChange={(e) => {
                    setSelectedTeacher(e.target.value);
                  }}
                >
                  {parsedTeacherData &&
                    parsedTeacherData.map((teacher: Teacher, key: number) => (
                      <option key={key} value={getFullName(teacher)}>
                        {getFullName(teacher)}
                      </option>
                    ))}
                </select>
              </div>
              <div className="flex flex-row w-full justify-between mt-[30px] text-[16px] font-inter">
                <button
                  className="w-[170px] h-[44px] border-[.5px] border-black text-[#344054] font-semibold rounded-[8px]"
                  onClick={() => setDisplayModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="w-[170px] h-[44px] bg-[#7F56D9] text-white font-semibold rounded-[8px]"
                  type="submit"
                >
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>
      )} */}
      <table suppressHydrationWarning className="w-[700px] table-fixed">
        <caption className="bg-white text-center h-[67px]">
          <span className="flex flex-col justify-center h-[67px] ml-[20px] text-[30px] text-[#101828]">
            Investments
          </span>
        </caption>

        <tbody className="bg-white w-[615px]">
          <tr className="h-[44px] bg-[#EAECF0] text-[12px] text-[#667085] text-left">
            <th>
              <div className="ml-[20px] flex flex-row">
                <div>Company</div>
                <div className="ml-[3px] mt-[2px]">
                  <Downarrow />
                </div>
              </div>
            </th>
            <th>
              <div className="ml-[20px] flex flex-row">
                <div>Shares</div>
                <div className="ml-[3px] mt-[2px]">
                  <Downarrow />
                </div>
              </div>
            </th>
          </tr>

          {userShares &&
            tickerList.map((tickerName: string, key: number) => (
              <tr
                key={key}
                className="h-[60px] border-gray-300 border-[.5px] hover:bg-gray-300 hover:cursor-pointer"
                // onClick={() => {
                //   setCurrentID(course.id);
                //   setSelectedName(course.name);
                //   setSelectedTeacher(course.teacher);
                //   setDisplayModal(true);
                // }}
              >
                <td className="font-chivo text-[14px] text-[#667085]">
                  <div className="ml-[20px] font-bold">{tickerName}</div>
                </td>
                <td>
                  <div className="ml-[20px] text-[#667085] font-chivo text-[14px]">
                    {userShares.get(tickerName)}
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button className="border-black border-[1px]" onClick={() => postData()}>
        Upload User Data
      </button>
      <button className="border-black border-[1px]">Retrieve User Data</button>
    </div>
  );
};

export default InvestmentTable;
