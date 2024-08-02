package com.msig.phonebookApp.repository;

import com.msig.phonebookApp.entity.Contact;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ContactRepository extends JpaRepository<Contact, String> {
    List<Contact> findAll(Sort sort);
    List<Contact> findByNameContainingIgnoreCase(String name);
}
