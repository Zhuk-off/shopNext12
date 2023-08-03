import { render, screen } from "@testing-library/react";
import Breadcrumbs from "@/src/components/breadcrumbs";
import { breadcrumbsFixture } from "@/src/components/breadcrumbs/fixtures";

describe("Breadcrumbs", () => {
  it("check for breadCrumbs", async () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbsFixture} clickable={false} />);

    const element1 = screen.getByText("Главная страница");
    const element2 = screen.getByText("Автомобильные товары, инструменты");
    const element3 = screen.getByText("Автомобильные наборы");
    const element4 = screen.getByText("Автомобильные наборы TOPTUL");
    expect(element1).toBeInTheDocument();
    expect(element2).toBeInTheDocument();
    expect(element3).toBeInTheDocument();
    expect(element4).toBeInTheDocument();
  });
  it("check if the last paragraph is clickable", async () => {
    render(<Breadcrumbs breadcrumbs={breadcrumbsFixture} clickable={true} />);

    const element = screen.getByRole("link", {
      name: "Автомобильные наборы TOPTUL",
    });

    expect(element).toBeInTheDocument();
  });

  it("renders clickable breadcrumbs correctly", () => {
    const { getByText } = render(
      <Breadcrumbs breadcrumbs={breadcrumbsFixture} clickable />
    );

    breadcrumbsFixture.forEach((breadcrumb) => {
      const breadcrumbLink = getByText(breadcrumb.text);
      const slug = breadcrumb.url.split("/").filter(Boolean).pop(); // Извлечение slug
      const expectedHref = `/${slug}`; // Создание ожидаемого slug
      expect(breadcrumbLink.tagName).toBe("A");
      expect(breadcrumbLink).toHaveAttribute("href", expectedHref);
    });
  });

  it("renders non-clickable breadcrumbs correctly", () => {
    const { getByText, queryAllByRole } = render(
      <Breadcrumbs breadcrumbs={breadcrumbsFixture} />
    );

    breadcrumbsFixture.forEach((breadcrumb) => {
      const breadcrumbText = getByText(breadcrumb.text);
      expect(breadcrumbText).toBeInTheDocument();
    });

    const breadcrumbLinks = queryAllByRole("link");
    expect(breadcrumbLinks).toHaveLength(breadcrumbsFixture.length - 1);
  });
});
