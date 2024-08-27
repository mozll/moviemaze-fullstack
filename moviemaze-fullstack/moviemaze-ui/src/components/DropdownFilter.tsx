import { CustomFlowbiteTheme, Dropdown, Flowbite } from "flowbite-react";

const customTheme: CustomFlowbiteTheme = {
  button: {
    color: {
      primary: "bg-transparent border border-white text-white",
    },
  },
};

export interface Data {
  id: string | number;
  name: string;
}

interface Props {
  selectedData?: string;
  onSelectData: (data: Data) => void;
  dataList: Data[];
}

const DropdownFilter = ({ selectedData, onSelectData, dataList }: Props) => {
  const data = dataList.find((data) => data.id.toString() === selectedData);

  return (
    <>
      <Flowbite theme={{ theme: customTheme }}>
        <Dropdown
          label={data ? data.name : "All"}
          dismissOnClick={true}
          color="primary"
        >
          {dataList.map((dataItem) => (
            <Dropdown.Item
              key={dataItem.id}
              onClick={() => onSelectData(dataItem)}
            >
              {dataItem.name}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </Flowbite>
    </>
  );
};

export default DropdownFilter;
