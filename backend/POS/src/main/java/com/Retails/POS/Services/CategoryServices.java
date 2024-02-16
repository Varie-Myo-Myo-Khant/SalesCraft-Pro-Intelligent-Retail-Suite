package com.Retails.POS.Services;

import com.Retails.POS.Models.Category;
import com.Retails.POS.Repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServices {

    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> getAllCateogry(){
        return categoryRepo.findAll();
    }

    public Category saveCateogry(Category category){
        return categoryRepo.save(category);
    }

    public void deleteCategory(String id){
        categoryRepo.deleteById(id);
    }

    public Category getCategoryById(String categoryId){
        return categoryRepo.findById(categoryId).get();
    }


    public List<Category> searchByCategory(String category) {
        return categoryRepo.findByCategoryContaining(category);
    }
}
