export type GendreCompProps = {
  type: string;
  img: string;
};

export type SubCategory = {
  id: number;
  attributes: {
    title: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type Product = {
  id: number;
  attributes: {
    createdAt: string;
    date: string;
    desc: string;
    isNew: boolean;
    onSale: boolean;
    price: number;
    publishedAt: string;
    salePrice: number;
    title: string;
    type: string;
    updatedAt: string;
    img: {
      data: {
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          url: string;
        };
      };
    };
    img2: {
      data: {
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          url: string;
        };
      };
    };
    img3: {
      data: {
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number;
          height: number;
          url: string;
        };
      };
    };
    sub_categories: {
      data: Array<{
        id: number;
        attributes: {
          title: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      }>;
    };
    categories: {
      data: Array<{
        id: number;
        attributes: {
          title: string;
          desc: string;
          createdAt: string;
          updatedAt: string;
          publishedAt: string;
        };
      }>;
    };
  };
};

export type Gendre = {
  id: string;
  title: string;
};

export type FilterState = {
  selectedCategories: number[];
  selectedGendres: string;
  selectedSort: string;
};

export type  ProductGridProps = {
  type: string;
  filterState: FilterState;
  token: string;
  splitgrid: boolean;
}