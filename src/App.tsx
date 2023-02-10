import React from "react";
import CRoutes from "./routes";
import "antd/dist/reset.css";
import "./App.css";
import BaseLayout from "./components/layout";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

interface IProps {}

const App: React.FC<IProps> = (props) => {
  const navigate = useNavigate();

  const toPage = (path: string) => {
    navigate(path);
  };

  return (
    <BaseLayout>
      <Button type="primary" onClick={() => toPage("/")}>
        首页
      </Button>
      <Button type="primary" onClick={() => toPage("/foo")}>
        Foo
      </Button>
      <Button type="primary" onClick={() => toPage("/bar")}>
        Bar
      </Button>
      <CRoutes />
    </BaseLayout>
  );
};

export default App;
