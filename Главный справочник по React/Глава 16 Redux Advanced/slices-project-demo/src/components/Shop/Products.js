import ProductItem from "./ProductItem";
import styles from "./Products.module.css";

const DUMMY_ITEMS = [
  {
    id: 1,
    price: 7,
    title: "Супер-товар 1",
    description: "Описание товара 1"
  },
  {
    id: 2,
    price: 15,
    title: "Супер-товар 2",
    description: "Описание товара 2"
  },
  {
    id: 3,
    price: 12,
    title: "Супер-товар 3",
    description: "Описание товара 3"
  },
  {
    id: 4,
    price: 20,
    title: "Супер-товар 4",
    description: "Описание товара 4"
  },
  {
    id: 5,
    price: 5,
    title: "Супер-товар 5",
    description: "Описание товара 5"
  },
  {
    id: 6,
    price: 8,
    title: "Супер-товар 6",
    description: "Описание товара 6"
  }
];

const Products = (props) => {
  return (
    <section className={styles.products}>
      <h2>В нашем магазине товары самого высокого качества</h2>
      <ul>
        {DUMMY_ITEMS.map(item => (
          <ProductItem
            key={item.id}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
