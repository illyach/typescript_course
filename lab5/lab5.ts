// Базовий інтерфейс для всього контенту
interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    publishedAt?: Date;
    status: 'draft' | 'published' | 'archived';
  }
  
interface Article extends BaseContent {
    name: string;
    author: string;
    description:string;
  }
  

interface Product extends BaseContent {
    name: string;
    price: number;
    description: string;
    rating:number;
    img:string;
  }
  
 type ContentOperations<T extends BaseContent> = {
    create: (content: T) => T;
    read: (id: string) => T; 
    update: (id: string, content: T) => T;
    delete: (id: string) => void;
  }
  

type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}

// Ваше завдання: створити систему прав доступу
type AccessControl<T extends BaseContent> = {
    roles: Record<Role, Permission>;
}

// Створіть систему валідації:
type Validator<T> = {
  validate: (data: T) => ValidationResult;
}

type ValidationResult = {
  isValid: boolean;
  errors?: string[];
}

// Ваше завдання: розширити систему валідації
// для різних типів контенту та створити композитний валідатор

// Article Validator  (статті)
const articleValidator: Validator<Article> = {
  validate: (data) => {
    const errors: string[] = [];
    if (!data.name) errors.push("Title is required");
    if (!data.author) errors.push("Body is required");
    if (!data.description) errors.push("description is required");
    return {
      isValid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  },
};
  // Product Validator
  const productValidator: Validator<Product> = {
    validate: (data) => {
      const errors: string[] = [];
      if (!data.name) errors.push("Product name is required");
      if (data.price <= 0) errors.push("Price must be greater than zero");
      return {
        isValid: errors.length === 0,
        errors: errors.length > 0 ? errors : undefined,
      };
    },
  };
  

// 4. Версіонування контенту

type Versioned<T extends BaseContent> = T & {
    version: number;
    updateVersion: () => void;
  }
  


  const versionedProduct: Versioned<Product> = {
    id: "prod-123",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
    name: "Smartphone X",
    price: 999.99,
    description: "Latest smartphone with advanced features",
    rating: 4.8,
    img: "smartphone-x.jpg",
    version: 1,
    updateVersion() {
      this.version++; // Збільшення версії на 1
      this.updatedAt = new Date(); // Оновлення дати
    }
  };

  const versionedArticle: Versioned<Article> = {
    id: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
    name: "TypeScript in Action",
    description: "This article discusses TypeScript...",
    author: "illya lupu",
    version: 1,
    updateVersion() {
      this.version++; // Збільшення версії на 1
      this.updatedAt = new Date(); // Оновлення дати
    }
  };
  
//// Тестування Версіонування
  console.log(versionedArticle.version); // 1
  versionedArticle.updateVersion();
  console.log(versionedArticle.version); // 2
  console.log(versionedArticle.updatedAt); // Оновлена дата
////

//Тестування Валідації

  const testArticles1: Article = {
    id: "1", 
    createdAt: new Date(),
    updatedAt: new Date(), 
    status: "draft", 
    name: "My Article",
    author: "illya lupu",
    description: "An interesting article",
  };

console.log("Valid article:", articleValidator.validate(testArticles1)); 


const testProducts1: Product = {
    name: "3",
    price: 1500,
    description: "13.3 duim silver color",
    img: "some",
    rating: 4.5,
    id: "2",
    createdAt: new Date(), 
    updatedAt: new Date(),
    status: "draft",
  };

console.log("Valid product:", productValidator.validate(testProducts1)); 
////////

//Тестування ролей

// Описуємо ролі та права доступу
const accessControl: AccessControl<BaseContent> = {
    roles: {
      admin: { create: true, read: true, update: true, delete: true },
      editor: { create: true, read: true, update: true, delete: false },
      viewer: { create: false, read: true, update: false, delete: false },
    },
  };
  
  // Функція для перевірки прав доступу
  function canPerformAction(
    role: Role,
    action: keyof Permission,
    content: BaseContent
  ): boolean {
    const permissions = accessControl.roles[role];
    console.log(`Role: ${role}, Action: ${action}, Content ID: ${content.id}`);
    return permissions[action];
  }
  
  // Тестові дані
  const testArticle: Article = {
    id: "123",
    createdAt: new Date(),
    updatedAt: new Date(),
    status: "draft",
    name: "Testing Roles",
    author: "Test Author",
    description: "Article for testing role permissions",
  };
  
  // Тестування з різними ролями
  const rolesToTest: Role[] = ["admin", "editor", "viewer"];
  
  // Тестування кожної дії (create, read, update, delete)
  const actionsToTest: (keyof Permission)[] = ["create", "read", "update", "delete"];
  
  console.log("\nTesting Role Permissions:");
  
  rolesToTest.forEach((role) => {
    actionsToTest.forEach((action) => {
      const result = canPerformAction(role, action, testArticle);
      console.log(
        `Role "${role}" can ${action} content with ID "${testArticle.id}": ${result}`
      );
    });
  });
  //////////